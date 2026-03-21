<?php
/**
 * Friction First - Telegram Bot Webhook / Subscribe Handler
 * 
 * Este archivo actúa como webhook del bot de Telegram.
 * Configura el webhook con:
 * https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://rogeliodelarosa.com/frictionfirst/telegram/subscribe.php
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';

// Handle webhook from Telegram (bot receives messages)
$input = file_get_contents('php://input');
$update = json_decode($input, true);

if ($update && isset($update['message'])) {
    $chatId = $update['message']['chat']['id'];
    $text = trim($update['message']['text'] ?? '');
    $username = $update['message']['from']['first_name'] ?? 'Estoico';

    // Handle /start command
    if ($text === '/start') {
        sendTelegramMessage($chatId, 
            "🔥 *Bienvenido a Friction First*\n\n" .
            "Recibe sabiduría estoica cada mañana a las 7:00 AM.\n\n" .
            "Para suscribirte, envía:\n" .
            "`/subscribe TU_ID`\n\n" .
            "Encuentra tu ID en tu panel: rogeliodelarosa.com/frictionfirst/forge\n\n" .
            "_Memento Mori_ ⏳"
        );
    }
    // Handle /subscribe command
    elseif (strpos($text, '/subscribe') === 0) {
        $parts = explode(' ', $text);
        $userId = isset($parts[1]) ? (int)$parts[1] : 0;

        if ($userId > 0) {
            $db = getDB();
            $stmt = $db->prepare('SELECT id, email FROM ff_users WHERE id = ?');
            $stmt->execute([$userId]);
            $user = $stmt->fetch();

            if ($user) {
                // Update user with telegram chat_id
                $stmt = $db->prepare('UPDATE ff_users SET telegram_chat_id = ?, telegram_subscribed = 1 WHERE id = ?');
                $stmt->execute([$chatId, $userId]);

                sendTelegramMessage($chatId,
                    "✅ *¡Suscripción exitosa!*\n\n" .
                    "Hola {$username}, recibirás una frase estoica cada mañana a las 7:00 AM.\n\n" .
                    "🔥 _Choose Hard, Live Easy._\n\n" .
                    "Para cancelar, envía /unsubscribe"
                );
            } else {
                sendTelegramMessage($chatId,
                    "❌ ID de usuario no encontrado.\n\nVerifica tu ID en rogeliodelarosa.com/frictionfirst/forge"
                );
            }
        } else {
            sendTelegramMessage($chatId,
                "⚠️ Envía el comando con tu ID:\n`/subscribe TU_ID`\n\nEncuentra tu ID en tu panel."
            );
        }
    }
    // Handle /unsubscribe
    elseif ($text === '/unsubscribe') {
        $db = getDB();
        $stmt = $db->prepare('UPDATE ff_users SET telegram_subscribed = 0 WHERE telegram_chat_id = ?');
        $stmt->execute([$chatId]);

        sendTelegramMessage($chatId,
            "👋 Te has desuscrito de las frases diarias.\n\nPuedes volver cuando quieras con /subscribe TU_ID"
        );
    }
    // Default response
    else {
        sendTelegramMessage($chatId,
            "🔥 *Friction First Bot*\n\n" .
            "Comandos disponibles:\n" .
            "/start - Información del bot\n" .
            "/subscribe TU_ID - Suscribirte\n" .
            "/unsubscribe - Cancelar suscripción"
        );
    }
}

// Also handle AJAX subscription from the web app
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'check_subscription') {
    header('Content-Type: application/json');
    require_once __DIR__ . '/../includes/session.php';
    
    if (!isLoggedIn()) {
        echo json_encode(['success' => false, 'message' => 'No autenticado']);
        exit;
    }

    $db = getDB();
    $stmt = $db->prepare('SELECT telegram_subscribed FROM ff_users WHERE id = ?');
    $stmt->execute([getCurrentUserId()]);
    $user = $stmt->fetch();

    echo json_encode([
        'success' => true,
        'subscribed' => (bool)$user['telegram_subscribed']
    ]);
    exit;
}

function sendTelegramMessage($chatId, $text) {
    $url = 'https://api.telegram.org/bot' . FF_TELEGRAM_BOT_TOKEN . '/sendMessage';
    
    $data = [
        'chat_id'    => $chatId,
        'text'       => $text,
        'parse_mode' => 'Markdown',
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
}
?>
