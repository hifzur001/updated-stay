<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

$action = $_POST['action'] ?? '';

switch ($action) {
    case 'login':
        handleLogin();
        break;
    case 'signup':
        handleSignup();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check_session':
        handleCheckSession();
        break;
    default:
        sendJsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
}

function handleLogin() {
    $requiredFields = ['username', 'password'];
    $errors = validateRequired($_POST, $requiredFields);
    
    if (!empty($errors)) {
        sendJsonResponse(['success' => false, 'message' => implode(', ', $errors)], 400);
    }
    
    $username = sanitizeInput($_POST['username']);
    $password = $_POST['password'];
    
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT id, username, email, password, full_name, phone FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $username]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            
            sendJsonResponse([
                'success' => true,
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'full_name' => $user['full_name'],
                    'phone' => $user['phone']
                ]
            ]);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Invalid username or password'], 401);
        }
    } catch (Exception $e) {
        error_log("Login error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Login failed. Please try again.'], 500);
    }
}

function handleSignup() {
    $requiredFields = ['username', 'email', 'password'];
    $errors = validateRequired($_POST, $requiredFields);
    
    if (!empty($errors)) {
        sendJsonResponse(['success' => false, 'message' => implode(', ', $errors)], 400);
    }
    
    $username = sanitizeInput($_POST['username']);
    $email = sanitizeInput($_POST['email']);
    $password = $_POST['password'];
    $fullName = sanitizeInput($_POST['full_name'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid email format'], 400);
    }
    
    // Validate password strength
    if (strlen($password) < 6) {
        sendJsonResponse(['success' => false, 'message' => 'Password must be at least 6 characters long'], 400);
    }
    
    // Validate username format
    if (strlen($username) < 3) {
        sendJsonResponse(['success' => false, 'message' => 'Username must be at least 3 characters long'], 400);
    }
    
    if (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
        sendJsonResponse(['success' => false, 'message' => 'Username can only contain letters, numbers, and underscores'], 400);
    }
    
    try {
        $pdo = getDBConnection();
        
        // Check if username already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            sendJsonResponse(['success' => false, 'message' => 'Username already exists'], 409);
        }
        
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            sendJsonResponse(['success' => false, 'message' => 'Email already exists'], 409);
        }
        
        // Create new user
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, full_name, phone) VALUES (?, ?, ?, ?, ?)");
        $result = $stmt->execute([$username, $email, $hashedPassword, $fullName, $phone]);
        
        if (!$result) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to create account'], 500);
        }
        
        $userId = $pdo->lastInsertId();
        
        // Auto-login after signup
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $_SESSION['user_id'] = $userId;
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;
        
        sendJsonResponse([
            'success' => true,
            'message' => 'Account created successfully',
            'user' => [
                'id' => $userId,
                'username' => $username,
                'email' => $email,
                'full_name' => $fullName,
                'phone' => $phone
            ]
        ]);
        
    } catch (PDOException $e) {
        error_log("Signup PDO error: " . $e->getMessage());
        
        // Check for duplicate entry errors
        if ($e->getCode() == 23000) {
            if (strpos($e->getMessage(), 'username') !== false) {
                sendJsonResponse(['success' => false, 'message' => 'Username already exists'], 409);
            } elseif (strpos($e->getMessage(), 'email') !== false) {
                sendJsonResponse(['success' => false, 'message' => 'Email already exists'], 409);
            }
        }
        
        sendJsonResponse(['success' => false, 'message' => 'Account creation failed. Please try again.'], 500);
    } catch (Exception $e) {
        error_log("Signup error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Account creation failed. Please try again.'], 500);
    }
}

function handleLogout() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    session_destroy();
    sendJsonResponse(['success' => true, 'message' => 'Logged out successfully']);
}

function handleCheckSession() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    if (isset($_SESSION['user_id'])) {
        $user = getCurrentUser();
        if ($user) {
            sendJsonResponse([
                'success' => true,
                'logged_in' => true,
                'user' => $user
            ]);
        } else {
            sendJsonResponse([
                'success' => true,
                'logged_in' => false
            ]);
        }
    } else {
        sendJsonResponse([
            'success' => true,
            'logged_in' => false
        ]);
    }
}
?>
