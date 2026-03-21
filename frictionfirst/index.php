<?php
require_once __DIR__ . '/includes/session.php';
require_once __DIR__ . '/includes/csrf.php';
require_once __DIR__ . '/includes/quotes.php';

// If already logged in, redirect to forge
if (isLoggedIn()) {
    header('Location: ' . FF_BASE_URL . '/forge/');
    exit;
}

$todayQuote = getTodaysQuote();
$csrfToken = generateCSRFToken();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Friction First — Tu Tiempo Es Finito. Actúa Como Si Lo Supieras.</title>
    <meta name="description" content="Confronta la finitud del tiempo. Visualiza tus semanas de vida, recibe frases estoicas diarias y forja tu carácter. Choose Hard, Live Easy.">
    <meta name="robots" content="index, follow">

    <!-- Open Graph -->
    <meta property="og:title" content="Friction First — Choose Hard, Live Easy">
    <meta property="og:description" content="Visualiza tus semanas de vida restantes. Recibe sabiduría estoica diaria. Forja tu carácter.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://rogeliodelarosa.com/frictionfirst">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="css/style.css">

    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>🔥</text></svg>">
</head>
<body>

    <!-- ========== NAVBAR ========== -->
    <nav class="navbar" id="navbar">
        <div class="container">
            <a href="<?= FF_BASE_URL ?>/" class="navbar-brand">
                <span class="brand-icon">🔥</span>
                FRICTION FIRST
            </a>
            <div class="navbar-cta">
                <button class="btn btn-outline btn-sm" data-open-modal data-tab="login">Iniciar Sesión</button>
                <button class="btn btn-primary btn-sm" data-open-modal data-tab="register">Crear Cuenta</button>
            </div>
        </div>
    </nav>

    <!-- ========== HERO ========== -->
    <section class="hero" id="hero">
        <div class="hero-bg">
            <img src="images/hero-stoic.png" alt="Choose Hard, Live Easy" loading="eager">
        </div>
        <div class="hero-content">
            <div class="hero-badge">⚡ Choose Hard, Live Easy</div>
            <h1>TU TIEMPO ES <span>FINITO</span></h1>
            <p class="hero-subtitle">
                Confronta la realidad de tus semanas restantes. Recibe sabiduría estoica que aplica al mundo moderno. Forja tu carácter cada día en la fragua.
            </p>
            <div class="hero-ctas">
                <button class="btn btn-primary" data-open-modal data-tab="register">
                    Entra a la Fragua →
                </button>
                <a href="#features" class="btn btn-outline">Descubre Más</a>
            </div>
            <div class="hero-stats">
                <div class="hero-stat">
                    <div class="hero-stat-number" data-count="4160" data-suffix="">0</div>
                    <div class="hero-stat-label">Semanas Promedio de Vida</div>
                </div>
                <div class="hero-stat">
                    <div class="hero-stat-number" data-count="73">0</div>
                    <div class="hero-stat-label">Años de Expectativa</div>
                </div>
                <div class="hero-stat">
                    <div class="hero-stat-number" data-count="365" data-suffix="">0</div>
                    <div class="hero-stat-label">Oportunidades al Año</div>
                </div>
            </div>
        </div>
    </section>

    <!-- ========== FEATURES ========== -->
    <section class="features" id="features">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">La Fragua</span>
                <h2 class="section-title">FORJA TU CONCIENCIA</h2>
                <p class="section-subtitle">Herramientas diseñadas para confrontarte con el tiempo y forjar disciplina estoica.</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">⏳</div>
                    <h3>SEMANAS DE VIDA</h3>
                    <p>Visualiza cada una de tus ~4,160 semanas en una cuadrícula. Las que ya pasaron no vuelven. Las que quedan son tu oportunidad. Sin filtros, sin consuelo — solo la verdad.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📅</div>
                    <h3>PROGRESO DEL AÑO</h3>
                    <p>¿En qué día del año vas? Una cuadrícula de 365 días con los días vividos marcados. Mira cómo el año se consume. Cada cuadro vacío es una oportunidad que se acerca.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🏛️</div>
                    <h3>SABIDURÍA ESTOICA</h3>
                    <p>Una frase estoica diaria con contexto moderno. No filosofía académica — sabiduría aplicable a tu carrera, relaciones, disciplina y mentalidad. De Marco Aurelio a tu realidad.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📲</div>
                    <h3>BOT DE TELEGRAM</h3>
                    <p>Recibe tu frase estoica cada mañana a las 7:00 AM directo en Telegram. Empieza el día con perspectiva, no con redes sociales. Tu primer pensamiento importa.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔥</div>
                    <h3>MEMENTO MORI</h3>
                    <p>Un recordatorio constante de tu mortalidad. No para deprimirte — para liberarte. Cuando aceptas el final, cada decisión se vuelve clara y urgente.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⚔️</div>
                    <h3>CHOOSE HARD</h3>
                    <p>La fricción voluntaria te fortalece. Agua fría, ejercicio, conversaciones difíciles, disciplina diaria. Este es tu recordatorio: lo fácil te destruye lentamente.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ========== DAILY QUOTE PREVIEW ========== -->
    <section class="quote-preview">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Frase del Día</span>
                <h2 class="section-title">SABIDURÍA PARA HOY</h2>
            </div>
            <div class="quote-card-preview">
                <p class="quote-text-preview">"<?= htmlspecialchars($todayQuote['quote']) ?>"</p>
                <p class="quote-author-preview">— <?= htmlspecialchars($todayQuote['author']) ?></p>
                <p class="quote-modern-preview"><?= htmlspecialchars($todayQuote['modern']) ?></p>
            </div>
        </div>
    </section>

    <!-- ========== CTA ========== -->
    <section class="cta-section">
        <div class="container">
            <h2 class="cta-title">¿LISTO PARA LA <span class="text-accent">FRAGUA</span>?</h2>
            <p class="cta-text">Crea tu cuenta gratis, confronta tus semanas restantes y empieza a forjar tu mejor versión. Sin excusas.</p>
            <button class="btn btn-primary" data-open-modal data-tab="register">
                Crear Cuenta Gratis →
            </button>
        </div>
    </section>

    <!-- ========== FOOTER ========== -->
    <footer class="footer">
        <div class="container">
            <div class="footer-links">
                <a href="legal/privacy.php">Política de Privacidad</a>
                <a href="legal/terms.php">Términos y Condiciones</a>
                <a href="https://rogeliodelarosa.com" target="_blank">rogeliodelarosa.com</a>
            </div>
            <p class="footer-copy">© <?= date('Y') ?> Friction First por Rogelio De La Rosa. Memento Mori.</p>
        </div>
    </footer>

    <!-- ========== AUTH MODAL ========== -->
    <div class="modal-overlay" id="authModal">
        <div class="modal">
            <button class="modal-close" data-close-modal aria-label="Cerrar">✕</button>

            <h2 class="modal-title">LA FRAGUA</h2>
            <p class="modal-subtitle">Entra y confronta tu tiempo.</p>

            <!-- Tabs -->
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Iniciar Sesión</button>
                <button class="auth-tab" data-tab="register">Crear Cuenta</button>
            </div>

            <!-- Login Form -->
            <form class="auth-form active" id="loginForm" method="POST" autocomplete="on">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrfToken) ?>">
                <div class="form-alert"></div>

                <div class="form-group">
                    <label class="form-label" for="loginEmail">Email</label>
                    <input class="form-input" type="email" id="loginEmail" name="email" placeholder="tu@email.com" required autocomplete="email">
                </div>

                <div class="form-group">
                    <label class="form-label" for="loginPassword">Contraseña</label>
                    <input class="form-input" type="password" id="loginPassword" name="password" placeholder="••••••••" required autocomplete="current-password">
                </div>

                <button type="submit" class="btn btn-primary btn-block">
                    <span class="btn-text">Entrar a la Fragua</span>
                    <span class="btn-spinner"></span>
                </button>
            </form>

            <!-- Register Form -->
            <form class="auth-form" id="registerForm" method="POST" autocomplete="on">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($csrfToken) ?>">
                <div class="form-alert"></div>

                <div class="form-group">
                    <label class="form-label" for="regEmail">Email</label>
                    <input class="form-input" type="email" id="regEmail" name="email" placeholder="tu@email.com" required autocomplete="email">
                </div>

                <div class="form-group">
                    <label class="form-label" for="regPassword">Contraseña</label>
                    <input class="form-input" type="password" id="regPassword" name="password" placeholder="Mínimo 8 caracteres" required minlength="8" autocomplete="new-password">
                </div>

                <div class="form-group">
                    <label class="form-label" for="regPasswordConfirm">Confirmar Contraseña</label>
                    <input class="form-input" type="password" id="regPasswordConfirm" name="password_confirm" placeholder="Repite tu contraseña" required minlength="8" autocomplete="new-password">
                </div>

                <div class="form-group">
                    <label class="form-label" for="regAge">Tu Edad</label>
                    <input class="form-input" type="number" id="regAge" name="age" placeholder="Ej: 28" required min="13" max="120">
                </div>

                <div class="form-group">
                    <div class="form-checkbox">
                        <input type="checkbox" id="regTerms" name="terms" required>
                        <span>Acepto la <a href="legal/privacy.php" target="_blank">Política de Privacidad</a> y los <a href="legal/terms.php" target="_blank">Términos y Condiciones</a></span>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary btn-block">
                    <span class="btn-text">Crear Cuenta</span>
                    <span class="btn-spinner"></span>
                </button>
            </form>
        </div>
    </div>

    <!-- Scripts -->
    <script src="js/app.js"></script>
</body>
</html>
