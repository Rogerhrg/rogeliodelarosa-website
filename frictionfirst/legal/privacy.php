<?php
/**
 * Friction First - Política de Privacidad
 */
require_once __DIR__ . '/../config.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Política de Privacidad — Friction First</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>🔥</text></svg>">
    <style>
        .legal-page { padding: 120px 0 60px; }
        .legal-page h1 { font-family: var(--ff-font-display); font-size: 48px; letter-spacing: 3px; margin-bottom: 8px; }
        .legal-page .legal-date { color: var(--ff-gray); font-size: 14px; margin-bottom: 40px; }
        .legal-content { max-width: 720px; margin: 0 auto; }
        .legal-content h2 { font-family: var(--ff-font-display); font-size: 24px; letter-spacing: 2px; color: var(--ff-accent); margin: 40px 0 16px; }
        .legal-content p, .legal-content li { color: var(--ff-gray-light); font-size: 15px; line-height: 1.8; margin-bottom: 12px; }
        .legal-content ul { padding-left: 24px; }
        .legal-back { display: inline-flex; align-items: center; gap: 8px; color: var(--ff-accent); font-size: 14px; margin-bottom: 40px; }
    </style>
</head>
<body>

    <nav class="navbar">
        <div class="container">
            <a href="<?= FF_BASE_URL ?>/" class="navbar-brand">
                <span class="brand-icon">🔥</span>
                FRICTION FIRST
            </a>
        </div>
    </nav>

    <div class="legal-page">
        <div class="container">
            <div class="legal-content">
                <a href="<?= FF_BASE_URL ?>/" class="legal-back">← Volver al inicio</a>
                <h1>POLÍTICA DE PRIVACIDAD</h1>
                <p class="legal-date">Última actualización: <?= date('d \d\e F \d\e Y') ?></p>

                <h2>1. INFORMACIÓN QUE RECOPILAMOS</h2>
                <p>En Friction First recopilamos la siguiente información cuando creas una cuenta:</p>
                <ul>
                    <li><strong>Email:</strong> Para identificar tu cuenta y poder contactarte si es necesario.</li>
                    <li><strong>Edad:</strong> Para calcular las semanas de vida restantes basadas en la expectativa de vida promedio mundial.</li>
                    <li><strong>Contraseña:</strong> Se almacena de forma encriptada (hash bcrypt) y nunca se guarda en texto plano.</li>
                    <li><strong>ID de Telegram:</strong> Solo si decides suscribirte al bot para recibir frases diarias.</li>
                </ul>

                <h2>2. USO DE LA INFORMACIÓN</h2>
                <p>Tu información se utiliza exclusivamente para:</p>
                <ul>
                    <li>Proporcionar el servicio de visualización de semanas de vida y frases estoicas.</li>
                    <li>Enviar la frase estoica diaria por Telegram si estás suscrito.</li>
                    <li>Mejorar la experiencia de usuario dentro de la plataforma.</li>
                </ul>

                <h2>3. NO COMPARTIMOS TUS DATOS</h2>
                <p><strong>No vendemos, alquilamos ni compartimos tu información personal con terceros.</strong> Tu email y datos personales permanecen exclusivamente en nuestra base de datos y no se utilizan para fines comerciales, publicitarios ni de marketing externo.</p>

                <h2>4. SEGURIDAD</h2>
                <p>Implementamos medidas de seguridad estándar de la industria:</p>
                <ul>
                    <li>Contraseñas encriptadas con bcrypt.</li>
                    <li>Protección CSRF en formularios.</li>
                    <li>Prepared statements para prevenir inyección SQL.</li>
                    <li>Sesiones seguras con cookies httponly.</li>
                </ul>

                <h2>5. TUS DERECHOS</h2>
                <p>Tienes derecho a:</p>
                <ul>
                    <li>Solicitar la eliminación de tu cuenta y todos tus datos.</li>
                    <li>Cancelar tu suscripción de Telegram en cualquier momento.</li>
                    <li>Solicitar información sobre los datos que tenemos almacenados sobre ti.</li>
                </ul>
                <p>Para ejercer estos derechos, contacta a: <a href="mailto:hola@rogeliodelarosa.com">hola@rogeliodelarosa.com</a></p>

                <h2>6. COOKIES</h2>
                <p>Utilizamos cookies de sesión necesarias para el funcionamiento del sistema de autenticación. No utilizamos cookies de rastreo ni analíticas de terceros.</p>

                <h2>7. CAMBIOS</h2>
                <p>Nos reservamos el derecho de actualizar esta política. Los cambios serán publicados en esta página.</p>

                <h2>8. CONTACTO</h2>
                <p>Para preguntas sobre privacidad: <a href="mailto:hola@rogeliodelarosa.com">hola@rogeliodelarosa.com</a></p>
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <div class="footer-links">
                <a href="<?= FF_BASE_URL ?>/legal/privacy.php">Privacidad</a>
                <a href="<?= FF_BASE_URL ?>/legal/terms.php">Términos</a>
                <a href="<?= FF_BASE_URL ?>/">Inicio</a>
            </div>
            <p class="footer-copy">© <?= date('Y') ?> Friction First por Rogelio De La Rosa.</p>
        </div>
    </footer>

</body>
</html>
