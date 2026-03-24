<?php
/**
 * Friction First - Database Connection (PDO)
 */

require_once __DIR__ . '/../../config/frictionfirst.config.php';

function getDB() {
    static $pdo = null;
    
    if ($pdo === null) {
        try {
            $dsn = 'mysql:host=' . FF_DB_HOST . ';dbname=' . FF_DB_NAME . ';charset=utf8mb4';
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, FF_DB_USER, FF_DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(['success' => false, 'message' => 'Error de conexión a base de datos.']));
        }
    }
    
    return $pdo;
}
?>
