<?php
require_once 'config.php';

$required = ['first_name', 'last_name', 'email', 'subject', 'message'];
$missing = validateRequired($required, $_POST);

if (!empty($missing)) {
    sendResponse(false, 'Missing required fields: ' . implode(', ', $missing));
}

$firstName = sanitizeInput($_POST['first_name']);
$lastName = sanitizeInput($_POST['last_name']);
$email = sanitizeInput($_POST['email']);
$phone = sanitizeInput($_POST['phone'] ?? '');
$subject = sanitizeInput($_POST['subject']);
$message = sanitizeInput($_POST['message']);
$newsletterSubscription = isset($_POST['newsletter_subscription']) ? 1 : 0;

// Validate email
if (!isValidEmail($email)) {
    sendResponse(false, 'Invalid email address');
}

$pdo = getDBConnection();
if (!$pdo) {
    sendResponse(false, 'Database connection failed');
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO contact_messages (
            first_name, last_name, email, phone, subject, message, 
            newsletter_subscription, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    ");
    
    $stmt->execute([
        $firstName,
        $lastName,
        $email,
        $phone,
        $subject,
        $message,
        $newsletterSubscription
    ]);
    
    // If newsletter subscription is requested, add to newsletter table
    if ($newsletterSubscription) {
        try {
            $stmt = $pdo->prepare("
                INSERT IGNORE INTO newsletter_subscriptions (email, full_name, created_at) 
                VALUES (?, ?, NOW())
            ");
            $stmt->execute([$email, $firstName . ' ' . $lastName]);
        } catch (PDOException $e) {
            // Newsletter subscription failed, but don't fail the whole request
            error_log("Newsletter subscription error: " . $e->getMessage());
        }
    }
    
    sendResponse(true, 'Message sent successfully');
    
} catch (PDOException $e) {
    error_log("Contact form error: " . $e->getMessage());
    sendResponse(false, 'Failed to send message. Please try again.');
}
?>
