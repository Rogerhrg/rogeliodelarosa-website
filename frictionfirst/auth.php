<?php
/**
 * Friction First - Authentication Handler
 * Handles: register, login, logout
 */

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/session.php';
require_once __DIR__ . '/includes/csrf.php';

header('Content-Type: application/json; charset=utf-8');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'register':
        handleRegister();
        break;
    case 'login':
        handleLogin();
        break;
    case 'logout':
        handleLogout();
        break;
    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Acción no válida.']);
}

function handleRegister() {
    // Validate CSRF
    if (!validateCSRFToken($_POST['csrf_token'] ?? '')) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Token de seguridad inválido. Recarga la página.']);
        return;
    }

    $email    = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'] ?? '';
    $confirm  = $_POST['password_confirm'] ?? '';
    $age      = (int)($_POST['age'] ?? 0);
    $terms    = isset($_POST['terms']);

    // Validations
    if (!$email) {
        echo json_encode(['success' => false, 'message' => 'Email inválido.']);
        return;
    }
    if (strlen($password) < 8) {
        echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 8 caracteres.']);
        return;
    }
    if ($password !== $confirm) {
        echo json_encode(['success' => false, 'message' => 'Las contraseñas no coinciden.']);
        return;
    }
    if ($age < 13 || $age > 120) {
        echo json_encode(['success' => false, 'message' => 'Edad debe estar entre 13 y 120 años.']);
        return;
    }
    if (!$terms) {
        echo json_encode(['success' => false, 'message' => 'Debes aceptar los términos y condiciones.']);
        return;
    }

    $db = getDB();

    // Check if email exists
    $stmt = $db->prepare('SELECT id FROM ff_users WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Este email ya está registrado.']);
        return;
    }

    // Hash password
    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    // Calculate approximate birth date from age
    $birthYear = (int)date('Y') - $age;
    $birthDate = $birthYear . '-01-01';

    // Insert user
    $stmt = $db->prepare('INSERT INTO ff_users (email, password_hash, age, birth_date) VALUES (?, ?, ?, ?)');
    $stmt->execute([$email, $hash, $age, $birthDate]);
    $userId = $db->lastInsertId();

    // Login user
    loginUser($userId, $email);

    echo json_encode([
        'success'  => true,
        'message'  => 'Cuenta creada. Bienvenido a la forja.',
        'redirect' => FF_BASE_URL . '/forge/'
    ]);
}

function handleLogin() {
    // Validate CSRF
    if (!validateCSRFToken($_POST['csrf_token'] ?? '')) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Token de seguridad inválido. Recarga la página.']);
        return;
    }

    $email    = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'] ?? '';

    if (!$email || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Email y contraseña son requeridos.']);
        return;
    }

    $db = getDB();
    $stmt = $db->prepare('SELECT id, email, password_hash FROM ff_users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        // Generic message to prevent user enumeration
        echo json_encode(['success' => false, 'message' => 'Credenciales inválidas.']);
        return;
    }

    loginUser($user['id'], $user['email']);

    echo json_encode([
        'success'  => true,
        'message'  => 'Bienvenido de vuelta.',
        'redirect' => FF_BASE_URL . '/forge/'
    ]);
}

function handleLogout() {
    logoutUser();
    // If AJAX
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
        echo json_encode(['success' => true, 'redirect' => FF_BASE_URL . '/']);
    } else {
        header('Location: ' . FF_BASE_URL . '/');
        exit;
    }
}
?>
