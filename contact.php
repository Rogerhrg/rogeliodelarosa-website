<?php
/**
 * contact.php - Formulario de contacto para Hostinger
 * Guarda en MySQL, notifica por Telegram y envía un correo.
 */

// 1. Capturar cualquier warning/notice/error de PHP ANTES de imprimir nada
ob_start();

// 2. Solo mostramos errores en el log del servidor, nunca en la salida
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// 3. Limpiar cualquier salida accidental (ej. BOM, whitespace en config.php)
// y declarar el tipo de contenido
header('Content-Type: application/json; charset=utf-8');
// Permitir peticiones Cross-Origin si trabajas desde otro dominio
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_clean();
    exit;
}

// Función helper para salir limpiamente con JSON
function jsonExit($status, $message) {
    ob_end_clean(); // Descarta cualquier salida sucia
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

// 4. Cargar Configuración
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    jsonExit('error', 'Falta el archivo de configuración del servidor.');
}

// Usar output buffering para atrapar cualquier salida de config.php
ob_start();
require_once $configFile;
ob_end_clean(); // Descartar salida de config.php (ej. espacios, BOM)

// 5. Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonExit('error', 'Método no permitido.');
}

// 6. Sanitizar datos
$name    = isset($_POST['name'])    ? trim(strip_tags($_POST['name']))    : '';
$email   = isset($_POST['email'])   ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone   = isset($_POST['phone'])   ? trim(strip_tags($_POST['phone']))   : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// 7. Validar
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    jsonExit('error', 'Por favor, completa todos los campos requeridos.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonExit('error', 'El correo electrónico no es válido.');
}

// 8. Conexión a la Base de Datos
try {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    error_log('DB Connection Error: ' . $e->getMessage());
    jsonExit('error', 'Error al conectar con la base de datos. Por favor intenta más tarde.');
}

// 9. Insertar en la Base de Datos
try {
    $stmt = $pdo->prepare('
        INSERT INTO contacts (name, email, phone, message)
        VALUES (:name, :email, :phone, :msg)
    ');
    $stmt->execute([
        ':name'  => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':msg'   => $message,
    ]);
} catch (PDOException $e) {
    error_log('DB Insert Error: ' . $e->getMessage());
    jsonExit('error', 'Error al guardar el mensaje. Por favor intenta más tarde.');
}

// 10. Notificación por Telegram
function sendTelegramMessage($token, $chat_id, $text) {
    if (empty($token) || $token === 'TU_TOKEN_AQUI_EJ_1234567:ABCDEF...') {
        return false;
    }

    $url  = 'https://api.telegram.org/bot' . $token . '/sendMessage';
    $data = [
        'chat_id'    => $chat_id,
        'text'       => $text,
        'parse_mode' => 'HTML',
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query($data),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => true,    // Activar en producción
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        error_log('Telegram cURL Error: ' . curl_error($ch));
    }
    curl_close($ch);
    return $result;
}

$telegramMsg  = "🚀 <b>Nuevo Contacto desde la Web</b>\n\n";
$telegramMsg .= "👤 <b>Nombre:</b> "   . htmlspecialchars($name)    . "\n";
$telegramMsg .= "📧 <b>Email:</b> "    . htmlspecialchars($email)   . "\n";
$telegramMsg .= "📱 <b>Teléfono:</b> " . htmlspecialchars($phone)   . "\n";
$telegramMsg .= "💬 <b>Mensaje:</b>\n" . htmlspecialchars($message) . "\n";

if (defined('TELEGRAM_BOT_TOKEN') && defined('TELEGRAM_CHAT_ID')) {
    sendTelegramMessage(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, $telegramMsg);
}

// 11. Notificación por Correo Electrónico
function sendEmailNotification($toEmail, $fromName, $fromEmail, $phone, $msg) {
    $subject = '=?UTF-8?B?' . base64_encode('📬 Nuevo contacto desde rogeliodelarosa.com') . '?=';

    $htmlBody = '
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #ddd;border-radius:8px;overflow:hidden;">
      <div style="background:#0a0a1a;padding:24px;text-align:center;">
        <h2 style="color:#ffffff;margin:0;">🚀 Nuevo Contacto desde la Web</h2>
        <p style="color:#a855f7;margin:4px 0 0;">rogeliodelarosa.com</p>
      </div>
      <div style="padding:24px;background:#fafafa;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;"><strong>👤 Nombre</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;">' . htmlspecialchars($fromName) . '</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;"><strong>📧 Email</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;"><a href="mailto:' . htmlspecialchars($fromEmail) . '">' . htmlspecialchars($fromEmail) . '</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;"><strong>📱 Teléfono</strong></td><td style="padding:10px 0;border-bottom:1px solid #eee;"><a href="tel:' . htmlspecialchars($phone) . '">' . htmlspecialchars($phone) . '</a></td></tr>
          <tr><td style="padding:10px 0;" valign="top"><strong>💬 Mensaje</strong></td><td style="padding:10px 0;">' . nl2br(htmlspecialchars($msg)) . '</td></tr>
        </table>
      </div>
      <div style="background:#0a0a1a;padding:14px;text-align:center;">
        <p style="color:#888;font-size:12px;margin:0;">Este correo fue generado automáticamente. No responder a este remitente.</p>
      </div>
    </div>';

    $boundary = md5(uniqid(time()));
    $headers  = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Formulario Web <formulario@rogeliodelarosa.com>',
        'Reply-To: ' . $fromName . ' <' . $fromEmail . '>',
        'X-Mailer: PHP/' . phpversion(),
    ]);

    $sent = mail($toEmail, $subject, $htmlBody, $headers);
    if (!$sent) {
        error_log('Email send failed to: ' . $toEmail);
    }
    return $sent;
}

sendEmailNotification(
    'formulario@rogeliodelarosa.com',
    $name,
    $email,
    $phone,
    $message
);

// 12. Respuesta exitosa
jsonExit('success', '¡Mensaje enviado con éxito! Te contactaré pronto.');
