<?php
/**
 * Friction First - Send Daily Stoic Quote via Telegram
 * 
 * Ejecutar como cron job diario a las 7:00 AM:
 * 0 7 * * * /usr/bin/php /domains/rogeliodelarosa.com/public_html/frictionfirst/telegram/send_daily.php
 * 
 * También se puede ejecutar manualmente para testing.
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/quotes.php';

// Get today's quote
$quote = getTodaysQuote();

// Format message
$message = "🔥 *Friction First — Frase del Día*\n\n";
$message .= "📜 _{$quote['quote']}_\n\n";
$message .= "— *{$quote['author']}*";
if (!empty($quote['work'])) {
    $message .= ", {$quote['work']}";
}
$message .= "\n\n";
$message .= "⚡ *Aplicación Moderna:*\n";
$message .= $quote['modern'];
$message .= "\n\n_Memento Mori. Choose Hard, Live Easy._ ⏳";

// Get all subscribed users
$db = getDB();
$stmt = $db->prepare('SELECT telegram_chat_id FROM ff_users WHERE telegram_subscribed = 1 AND telegram_chat_id IS NOT NULL');
$stmt->execute();
$subscribers = $stmt->fetchAll();

$sent = 0;
$errors = 0;

foreach ($subscribers as $sub) {
    $result = sendTelegramMessage($sub['telegram_chat_id'], $message);
    $response = json_decode($result, true);
    
    if ($response && $response['ok']) {
        $sent++;
    } else {
        $errors++;
        // If user blocked the bot, unsubscribe them
        if (isset($response['error_code']) && $response['error_code'] === 403) {
            $stmt2 = $db->prepare('UPDATE ff_users SET telegram_subscribed = 0 WHERE telegram_chat_id = ?');
            $stmt2->execute([$sub['telegram_chat_id']]);
        }
    }

    // Rate limit: Telegram allows ~30 msg/sec
    usleep(50000); // 50ms between messages
}

// Log results
$log = date('Y-m-d H:i:s') . " | Sent: {$sent} | Errors: {$errors} | Total: " . count($subscribers) . "\n";
file_put_contents(__DIR__ . '/send_log.txt', $log, FILE_APPEND);

echo "Done. Sent: {$sent}, Errors: {$errors}";

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
