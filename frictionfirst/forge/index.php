<?php
/**
 * Friction First - FORGE Dashboard
 * Portal principal del usuario
 */

require_once __DIR__ . '/../includes/session.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/../includes/quotes.php';

// Require login
requireLogin();

$db = getDB();
$userId = getCurrentUserId();

// Get user data
$stmt = $db->prepare('SELECT email, age, birth_date, telegram_subscribed, telegram_chat_id, created_at FROM ff_users WHERE id = ?');
$stmt->execute([$userId]);
$user = $stmt->fetch();

if (!$user) {
    logoutUser();
    header('Location: ' . FF_BASE_URL . '/');
    exit;
}

// Calculations
$age = (int)$user['age'];
$lifeExpectancy = FF_LIFE_EXPECTANCY;
$weeksPerYear = FF_WEEKS_PER_YEAR;
$totalWeeks = (int)round($lifeExpectancy * $weeksPerYear);
$weeksLived = (int)round($age * $weeksPerYear);
$weeksRemaining = max(0, $totalWeeks - $weeksLived);
$lifePercentage = min(100, round(($weeksLived / $totalWeeks) * 100, 1));

// Year progress
$now = new DateTime();
$startOfYear = new DateTime($now->format('Y') . '-01-01');
$endOfYear = new DateTime($now->format('Y') . '-12-31');
$dayOfYear = (int)$now->format('z') + 1; // 1-based
$totalDaysInYear = (int)$endOfYear->format('z') + 1;
$yearPercentage = round(($dayOfYear / $totalDaysInYear) * 100, 1);

// Today's quote
$todayQuote = getTodaysQuote();
$csrfToken = generateCSRFToken();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La Forja — Friction First</title>
    <meta name="robots" content="noindex, nofollow">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="css/forge.css">

    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>🔥</text></svg>">
</head>
<body class="forge-body">

    <!-- ========== FORGE HEADER ========== -->
    <header class="forge-header">
        <div class="container">
            <div class="forge-header-inner">
                <a href="<?= FF_BASE_URL ?>/" class="navbar-brand">
                    <span class="brand-icon">🔥</span>
                    FRICTION FIRST
                </a>
                <div class="forge-header-right">
                    <span class="forge-user-email"><?= htmlspecialchars($user['email']) ?></span>
                    <a href="<?= FF_BASE_URL ?>/auth.php?action=logout" class="btn btn-outline btn-sm" id="logoutBtn">
                        ← Cerrar Sesión
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- ========== FORGE MAIN ========== -->
    <main class="forge-main">
        <div class="container">

            <!-- Memento Mori Banner -->
            <div class="memento-banner">
                <div class="memento-icon">💀</div>
                <div class="memento-content">
                    <h1 class="memento-title">MEMENTO MORI</h1>
                    <p class="memento-text">
                        Tienes <strong class="text-accent"><?= number_format($weeksRemaining) ?></strong> semanas restantes estimadas.
                        Has vivido el <strong class="text-accent"><?= $lifePercentage ?>%</strong> de tu vida.
                        Hoy es el día <strong class="text-accent"><?= $dayOfYear ?></strong> de <?= $totalDaysInYear ?> del año <?= date('Y') ?>.
                    </p>
                </div>
            </div>

            <!-- Dashboard Grid -->
            <div class="forge-grid">

                <!-- ===== PANEL 1: LIFE WEEKS ===== -->
                <section class="forge-panel forge-panel-life" id="lifePanel">
                    <div class="panel-header">
                        <div class="panel-header-left">
                            <h2 class="panel-title">⏳ Tus Semanas de Vida</h2>
                            <p class="panel-subtitle">Expectativa de vida promedio mundial: <?= $lifeExpectancy ?> años (OMS)</p>
                        </div>
                        <div class="panel-stats">
                            <div class="panel-stat">
                                <span class="panel-stat-number text-accent"><?= number_format($weeksLived) ?></span>
                                <span class="panel-stat-label">Vividas</span>
                            </div>
                            <div class="panel-stat">
                                <span class="panel-stat-number"><?= number_format($weeksRemaining) ?></span>
                                <span class="panel-stat-label">Restantes</span>
                            </div>
                            <div class="panel-stat">
                                <span class="panel-stat-number"><?= number_format($totalWeeks) ?></span>
                                <span class="panel-stat-label">Total</span>
                            </div>
                        </div>
                    </div>

                    <!-- Life progress bar -->
                    <div class="life-progress-bar">
                        <div class="life-progress-fill" style="width: <?= $lifePercentage ?>%">
                            <span class="life-progress-text"><?= $lifePercentage ?>% vivido</span>
                        </div>
                    </div>

                    <!-- Life weeks grid -->
                    <div class="life-grid" id="lifeGrid"
                         data-weeks-lived="<?= $weeksLived ?>"
                         data-weeks-total="<?= $totalWeeks ?>"
                         data-years="<?= round($lifeExpectancy) ?>">
                        <!-- Generated by JS -->
                    </div>

                    <div class="life-legend">
                        <span class="legend-item"><span class="legend-dot lived"></span> Semanas vividas</span>
                        <span class="legend-item"><span class="legend-dot current"></span> Semana actual</span>
                        <span class="legend-item"><span class="legend-dot remaining"></span> Semanas restantes</span>
                    </div>
                </section>

                <!-- ===== PANEL 2: YEAR PROGRESS ===== -->
                <section class="forge-panel forge-panel-year" id="yearPanel">
                    <div class="panel-header">
                        <div class="panel-header-left">
                            <h2 class="panel-title">📅 Progreso del Año <?= date('Y') ?></h2>
                            <p class="panel-subtitle">Día <?= $dayOfYear ?> de <?= $totalDaysInYear ?></p>
                        </div>
                        <div class="year-percentage">
                            <span class="year-pct-number"><?= $yearPercentage ?>%</span>
                        </div>
                    </div>

                    <!-- Year progress bar -->
                    <div class="year-progress-bar">
                        <div class="year-progress-fill" style="width: <?= $yearPercentage ?>%"></div>
                    </div>

                    <!-- Year grid -->
                    <div class="year-grid" id="yearGrid"
                         data-day="<?= $dayOfYear ?>"
                         data-total="<?= $totalDaysInYear ?>">
                        <!-- Generated by JS -->
                    </div>

                    <div class="year-months-labels" id="yearMonthsLabels">
                        <!-- Generated by JS -->
                    </div>
                </section>

                <!-- ===== PANEL 2.5: HABIT TRACKER ===== -->
                <section class="forge-panel forge-panel-habits" id="habitsPanel" style="grid-column: 1 / -1;">
                    <div id="habitTrackerApp"></div>
                </section>

                <!-- ===== PANEL 3: DAILY STOIC QUOTE ===== -->
                <section class="forge-panel forge-panel-quote">
                    <div class="panel-header">
                        <h2 class="panel-title">🏛️ Sabiduría del Día</h2>
                        <p class="panel-subtitle"><?= date('d \d\e F, Y') ?></p>
                    </div>

                    <div class="quote-card">
                        <div class="quote-mark">"</div>
                        <blockquote class="quote-text">
                            <?= htmlspecialchars($todayQuote['quote']) ?>
                        </blockquote>
                        <cite class="quote-author">
                            — <?= htmlspecialchars($todayQuote['author']) ?>
                            <?php if (!empty($todayQuote['work'])): ?>
                                <span class="quote-work">, <?= htmlspecialchars($todayQuote['work']) ?></span>
                            <?php endif; ?>
                        </cite>
                    </div>

                    <div class="quote-modern">
                        <div class="quote-modern-label">⚡ Aplicación Moderna</div>
                        <p><?= htmlspecialchars($todayQuote['modern']) ?></p>
                    </div>
                </section>

                <!-- ===== PANEL 4: TELEGRAM ===== -->
                <section class="forge-panel forge-panel-telegram">
                    <div class="panel-header">
                        <h2 class="panel-title">📲 Bot de Telegram</h2>
                        <p class="panel-subtitle">Recibe tu frase estoica cada mañana a las 7:00 AM</p>
                    </div>

                    <?php if ($user['telegram_subscribed']): ?>
                        <div class="telegram-status telegram-active">
                            <div class="telegram-status-icon">✅</div>
                            <div>
                                <strong>Suscripción activa</strong>
                                <p>Recibes frases estoicas cada mañana a las 7:00 AM en Telegram.</p>
                            </div>
                        </div>
                    <?php else: ?>
                        <div class="telegram-steps">
                            <div class="telegram-step">
                                <span class="step-number">1</span>
                                <div>
                                    <strong>Abre el bot en Telegram</strong>
                                    <p>Click en el botón de abajo para abrir nuestro bot.</p>
                                </div>
                            </div>
                            <div class="telegram-step">
                                <span class="step-number">2</span>
                                <div>
                                    <strong>Envía /start</strong>
                                    <p>Inicia la conversación con el bot.</p>
                                </div>
                            </div>
                            <div class="telegram-step">
                                <span class="step-number">3</span>
                                <div>
                                    <strong>Envía tu código</strong>
                                    <p>Tu ID: <code class="copy-code"><?= $userId ?></code></p>
                                    <p style="margin-top: 5px; font-size: 11px; color: var(--ff-gray);">O el comando completo: <code class="copy-code" style="cursor: pointer;" title="Copiar al portapapeles">/suscribe <?= $userId ?></code></p>
                                </div>
                            </div>
                        </div>
                        <a href="https://t.me/<?= FF_TELEGRAM_BOT_USERNAME ?>?text=/suscribe%20<?= $userId ?>" target="_blank" class="btn btn-primary btn-block" style="margin-top: 20px;">
                            Abrir Bot en Telegram →
                        </a>
                    <?php endif; ?>
                </section>

            </div><!-- /forge-grid -->

        </div>
    </main>

    <!-- ========== FORGE FOOTER ========== -->
    <footer class="footer" style="margin-top: 40px;">
        <div class="container">
            <div class="footer-links">
                <a href="<?= FF_BASE_URL ?>/legal/privacy.php">Privacidad</a>
                <a href="<?= FF_BASE_URL ?>/legal/terms.php">Términos</a>
                <a href="https://rogeliodelarosa.com" target="_blank">rogeliodelarosa.com</a>
            </div>
            <p class="footer-copy">© <?= date('Y') ?> Friction First.</p>
        </div>
    </footer>

    <!-- Data for JS -->
    <script>
        window.FORGE_DATA = {
            weeksLived: <?= $weeksLived ?>,
            weeksTotal: <?= $totalWeeks ?>,
            yearsTotal: <?= round($lifeExpectancy) ?>,
            dayOfYear: <?= $dayOfYear ?>,
            totalDaysInYear: <?= $totalDaysInYear ?>,
            yearPercentage: <?= $yearPercentage ?>,
            userId: <?= $userId ?>,
            csrfToken: '<?= htmlspecialchars($csrfToken) ?>',
            baseUrl: '<?= FF_BASE_URL ?>'
        };
    </script>
    <script src="js/forge.js"></script>
    <script src="js/habit-tracker.js"></script>
</body>
</html>
