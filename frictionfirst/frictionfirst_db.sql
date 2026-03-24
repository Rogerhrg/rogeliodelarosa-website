-- ============================================
-- Friction First - Database Schema
-- Ejecutar en phpMyAdmin de Hostinger
-- ============================================

CREATE TABLE IF NOT EXISTS ff_users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    age INT(3) NOT NULL,
    birth_date DATE DEFAULT NULL,
    telegram_chat_id VARCHAR(50) DEFAULT NULL,
    telegram_subscribed TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_telegram (telegram_chat_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
