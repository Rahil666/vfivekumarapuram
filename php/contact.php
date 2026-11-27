
<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

$allowedOrigins = [
    'http://localhost:5173',
    'https://vfivehomes.com',
    'https://www.vfivehomes.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

header('Vary: Origin');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    http_response_code(403);
    echo json_encode([
        'success' => false,
        'message' => 'Origin not allowed'
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$interest = trim($_POST['interest'] ?? '');

if ($name === '' || $phone === '' || $interest === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please complete all required fields.'
    ]);
    exit;
}

if (!preg_match('/^[0-9+\s-]{8,16}$/', $phone)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid phone number.'
    ]);
    exit;
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address.'
    ]);
    exit;
}

$recipient = 'sales@vfivehomes.com';
$subject = 'New site visit enquiry from ' . $name;

$message = "Full name: {$name}\n";
$message .= "Phone / WhatsApp: {$phone}\n";
$message .= "Email: " . ($email ?: 'Not provided') . "\n";
$message .= "Interested in: {$interest}\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Website Enquiry <noreply@vfivehomes.com>'
];

if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

if (!mail($recipient, $subject, $message, implode("\r\n", $headers))) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to send enquiry.'
    ]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Enquiry sent successfully.'
]);
