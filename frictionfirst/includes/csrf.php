<?php
/**
 * Friction First - CSRF Protection
 */

require_once __DIR__ . '/session.php';

function generateCSRFToken() {
    initSession();
    if (empty($_SESSION['ff_csrf_token'])) {
        $_SESSION['ff_csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['ff_csrf_token'];
}

function validateCSRFToken($token) {
    initSession();
    if (empty($_SESSION['ff_csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['ff_csrf_token'], $token);
}

function csrfField() {
    return '<input type="hidden" name="csrf_token" value="' . htmlspecialchars(generateCSRFToken()) . '">';
}
?>
