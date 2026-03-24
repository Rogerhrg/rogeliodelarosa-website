<?php
/**
 * Friction First - Session Management
 */

require_once __DIR__ . '/../../config/frictionfirst.config.php';

function initSession() {
    if (session_status() === PHP_SESSION_NONE) {
        session_name(FF_SESSION_NAME);
        session_set_cookie_params([
            'lifetime' => 86400 * 7, // 7 días
            'path'     => FF_BASE_URL . '/',
            'secure'   => FF_COOKIE_SECURE,
            'httponly'  => FF_COOKIE_HTTPONLY,
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

function isLoggedIn() {
    initSession();
    return isset($_SESSION['ff_user_id']) && !empty($_SESSION['ff_user_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: ' . FF_BASE_URL . '/index.php?login=1');
        exit;
    }
}

function loginUser($userId, $email) {
    initSession();
    session_regenerate_id(true);
    $_SESSION['ff_user_id'] = $userId;
    $_SESSION['ff_email']   = $email;
    $_SESSION['ff_login_time'] = time();
}

function logoutUser() {
    initSession();
    $_SESSION = [];
    
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params['path'], $params['domain'],
            $params['secure'], $params['httponly']
        );
    }
    
    session_destroy();
}

function getCurrentUserId() {
    initSession();
    return $_SESSION['ff_user_id'] ?? null;
}

function getCurrentUserEmail() {
    initSession();
    return $_SESSION['ff_email'] ?? null;
}
?>
