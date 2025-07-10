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
    case 'admin_login':
        handleAdminLogin();
        break;
    case 'vendor_login':
        handleVendorLogin();
        break;
    case 'vendor_signup':
        handleVendorSignup();
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
        $stmt = $pdo->prepare("SELECT id, username, email, password, full_name, phone, role FROM users WHERE (username = ? OR email = ?) AND status = 'active'");
        $stmt->execute([$username, $username]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];
            
            if ($user['role'] === 'admin') {
                $_SESSION['admin_id'] = $user['id'];
            }
            
            sendJsonResponse([
                'success' => true,
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'full_name' => $user['full_name'],
                    'phone' => $user['phone'],
                    'role' => $user['role']
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

function handleAdminLogin() {
    $requiredFields = ['username', 'password'];
    $errors = validateRequired($_POST, $requiredFields);
    
    if (!empty($errors)) {
        sendJsonResponse(['success' => false, 'message' => implode(', ', $errors)], 400);
    }
    
    $username = sanitizeInput($_POST['username']);
    $password = $_POST['password'];
    
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT id, username, email, password, full_name, phone FROM users WHERE (username = ? OR email = ?) AND role = 'admin' AND status = 'active'");
        $stmt->execute([$username, $username]);
        $admin = $stmt->fetch();
        
        if ($admin && password_verify($password, $admin['password'])) {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['user_id'] = $admin['id'];
            $_SESSION['username'] = $admin['username'];
            $_SESSION['user_role'] = 'admin';
            
            sendJsonResponse([
                'success' => true,
                'message' => 'Admin login successful',
                'admin' => [
                    'id' => $admin['id'],
                    'username' => $admin['username'],
                    'email' => $admin['email'],
                    'full_name' => $admin['full_name'],
                    'role' => 'admin'
                ]
            ]);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Invalid admin credentials'], 401);
        }
    } catch (Exception $e) {
        error_log("Admin login error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Admin login failed. Please try again.'], 500);
    }
}

function handleVendorLogin() {
    $requiredFields = ['username', 'password'];
    $errors = validateRequired($_POST, $requiredFields);
    
    if (!empty($errors)) {
        sendJsonResponse(['success' => false, 'message' => implode(', ', $errors)], 400);
    }
    
    $username = sanitizeInput($_POST['username']);
    $password = $_POST['password'];
    
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT * FROM vendors WHERE (username = ? OR email = ?) AND status = 'active'");
        $stmt->execute([$username, $username]);
        $vendor = $stmt->fetch();
        
        if ($vendor && password_verify($password, $vendor['password'])) {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            
            $_SESSION['vendor_id'] = $vendor['id'];
            $_SESSION['vendor_username'] = $vendor['username'];
            $_SESSION['vendor_email'] = $vendor['email'];
            
            sendJsonResponse([
                'success' => true,
                'message' => 'Vendor login successful',
                'vendor' => [
                    'id' => $vendor['id'],
                    'username' => $vendor['username'],
                    'email' => $vendor['email'],
                    'full_name' => $vendor['full_name'],
                    'city' => $vendor['city'],
                    'business_name' => $vendor['business_name']
                ]
            ]);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Invalid vendor credentials'], 401);
        }
    } catch (Exception $e) {
        error_log("Vendor login error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Vendor login failed. Please try again.'], 500);
    }
}

function handleVendorSignup() {
    $requiredFields = ['username', 'email', 'password', 'full_name', 'phone', 'city', 'business_name'];
    $errors = validateRequired($_POST, $requiredFields);
    
    if (!empty($errors)) {
        sendJsonResponse(['success' => false, 'message' => implode(', ', $errors)], 400);
    }
    
    $username = sanitizeInput($_POST['username']);
    $email = sanitizeInput($_POST['email']);
    $password = $_POST['password'];
    $fullName = sanitizeInput($_POST['full_name']);
    $phone = sanitizeInput($_POST['phone']);
    $city = sanitizeInput($_POST['city']);
    $businessName = sanitizeInput($_POST['business_name']);
    $address = sanitizeInput($_POST['address'] ?? '');
    $businessLicense = sanitizeInput($_POST['business_license'] ?? '');
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid email format'], 400);
    }
    
    // Validate password strength
    if (strlen($password) < 6) {
        sendJsonResponse(['success' => false, 'message' => 'Password must be at least 6 characters long'], 400);
    }
    
    try {
        $pdo = getDBConnection();
        
        // Check if username already exists
        $stmt = $pdo->prepare("SELECT id FROM vendors WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            sendJsonResponse(['success' => false, 'message' => 'Username already exists'], 409);
        }
        
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM vendors WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            sendJsonResponse(['success' => false, 'message' => 'Email already exists'], 409);
        }
        
        // Create new vendor
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO vendors (username, email, password, full_name, phone, city, address, business_name, business_license, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')");
        $result = $stmt->execute([$username, $email, $hashedPassword, $fullName, $phone, $city, $address, $businessName, $businessLicense]);
        
        if (!$result) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to create vendor account'], 500);
        }
        
        sendJsonResponse([
            'success' => true,
            'message' => 'Vendor account created successfully. Please wait for admin approval.'
        ]);
        
    } catch (Exception $e) {
        error_log("Vendor signup error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Vendor account creation failed. Please try again.'], 500);
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
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, full_name, phone, role) VALUES (?, ?, ?, ?, ?, 'user')");
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
        $_SESSION['user_role'] = 'user';
        
        sendJsonResponse([
            'success' => true,
            'message' => 'Account created successfully',
            'user' => [
                'id' => $userId,
                'username' => $username,
                'email' => $email,
                'full_name' => $fullName,
                'phone' => $phone,
                'role' => 'user'
            ]
        ]);
        
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