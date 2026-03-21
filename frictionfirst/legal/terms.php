<?php
/**
 * Friction First - Términos y Condiciones
 */
require_once __DIR__ . '/../config.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Términos y Condiciones — Friction First</title>
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
                <h1>TÉRMINOS Y CONDICIONES</h1>
                <p class="legal-date">Última actualización: <?= date('d \d\e F \d\e Y') ?></p>

                <h2>1. ACEPTACIÓN</h2>
                <p>Al crear una cuenta en Friction First, aceptas estos términos y condiciones y nuestra <a href="privacy.php">Política de Privacidad</a>. Si no estás de acuerdo, no utilices el servicio.</p>

                <h2>2. DESCRIPCIÓN DEL SERVICIO</h2>
                <p>Friction First es una plataforma gratuita que proporciona:</p>
                <ul>
                    <li>Visualización de semanas de vida restantes basada en la expectativa de vida promedio mundial.</li>
                    <li>Frases estoicas diarias con contexto moderno.</li>
                    <li>Progreso visual del año en curso.</li>
                    <li>Bot de Telegram para recibir frases estoicas diarias (opcional).</li>
                </ul>

                <h2>3. CUENTAS DE USUARIO</h2>
                <ul>
                    <li>Debes proporcionar información veraz al registrarte.</li>
                    <li>Eres responsable de mantener la confidencialidad de tu contraseña.</li>
                    <li>Debes tener al menos 13 años de edad para usar el servicio.</li>
                    <li>Una cuenta por persona.</li>
                </ul>

                <h2>4. NATURALEZA DEL CONTENIDO</h2>
                <p><strong>Importante:</strong> Las visualizaciones de semanas de vida son estimaciones basadas en promedios estadísticos mundiales (73.4 años según la OMS) y no constituyen predicciones de salud ni diagnósticos médicos. El contenido estoico es de carácter filosófico e informativo.</p>

                <h2>5. SERVICIO GRATUITO</h2>
                <p>Friction First es un servicio gratuito. No se requiere pago alguno. Nos reservamos el derecho de:</p>
                <ul>
                    <li>Modificar o discontinuar el servicio en cualquier momento sin previo aviso.</li>
                    <li>Limitar el acceso si se detecta uso indebido.</li>
                </ul>

                <h2>6. LIMITACIÓN DE RESPONSABILIDAD</h2>
                <p>El servicio se proporciona "tal cual" sin garantías de ningún tipo. No nos hacemos responsables de:</p>
                <ul>
                    <li>Interrupciones del servicio.</li>
                    <li>Pérdida de datos.</li>
                    <li>Decisiones tomadas basándose en el contenido de la plataforma.</li>
                </ul>

                <h2>7. ELIMINACIÓN DE CUENTA</h2>
                <p>Puedes solicitar la eliminación de tu cuenta en cualquier momento contactando a <a href="mailto:hola@rogeliodelarosa.com">hola@rogeliodelarosa.com</a>. Se eliminarán todos tus datos personales de nuestra base de datos.</p>

                <h2>8. PROPIEDAD INTELECTUAL</h2>
                <p>Las frases estoicas son de dominio público. El diseño, código y contenido original de Friction First pertenecen a Rogelio De La Rosa.</p>

                <h2>9. MODIFICACIONES</h2>
                <p>Nos reservamos el derecho de modificar estos términos. Los cambios entrarán en vigor al publicarse en esta página. El uso continuo del servicio implica aceptación de los términos actualizados.</p>

                <h2>10. CONTACTO</h2>
                <p>Para preguntas: <a href="mailto:hola@rogeliodelarosa.com">hola@rogeliodelarosa.com</a></p>
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
