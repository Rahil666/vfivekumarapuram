<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$interest = trim($_POST['interest'] ?? '');

if ($name === '' || $phone === '' || $interest === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please complete all required fields.']);
    exit;
}

if (!preg_match('/^[0-9+\s-]{8,16}$/', $phone)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid phone number.']);
    exit;
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$recipient = 'sales@vfivehomes.com';
$subject = 'New site visit enquiry from ' . $name;
$message = "Full name: {$name}\n"
    . "Phone / WhatsApp: {$phone}\n"
    . 'Email: ' . ($email !== '' ? $email : 'Not provided') . "\n"
    . "Interested in: {$interest}\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: VFIVE Pearl Website <noreply@vfivehomes.com>',
];

if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

if (!mail($recipient, $subject, $message, implode("\r\n", $headers))) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to send enquiry. Please try again.']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Enquiry sent successfully.']);
