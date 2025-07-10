<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'stayscape_db');

// Create database connection
function getDBConnection() {
    try {
        // First connect without database to create it if needed
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        
        // Create database if it doesn't exist
        $pdo->exec("CREATE DATABASE IF NOT EXISTS " . DB_NAME . " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("USE " . DB_NAME);
        
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        die(json_encode(['success' => false, 'message' => 'Database connection failed']));
    }
}

// Initialize database tables
function initializeDatabase() {
    try {
        $pdo = getDBConnection();
        
        // Create users table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                full_name VARCHAR(100),
                phone VARCHAR(20),
                role ENUM('user', 'admin') DEFAULT 'user',
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_username (username),
                INDEX idx_email (email),
                INDEX idx_role (role)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
        
        // Create vendors table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS vendors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                full_name VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                city VARCHAR(50) NOT NULL,
                address TEXT,
                business_name VARCHAR(200),
                business_license VARCHAR(100),
                status ENUM('active', 'inactive', 'pending') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_username (username),
                INDEX idx_email (email),
                INDEX idx_city (city),
                INDEX idx_status (status)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
        
        // Create services table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS services (
                id INT AUTO_INCREMENT PRIMARY KEY,
                vendor_id INT NOT NULL,
                service_id VARCHAR(50) UNIQUE NOT NULL,
                title VARCHAR(200) NOT NULL,
                type VARCHAR(50) NOT NULL,
                city VARCHAR(50) NOT NULL,
                location VARCHAR(200) NOT NULL,
                price_per_night DECIMAL(10,2) NULL,
                price_per_day DECIMAL(10,2) NULL,
                price_per_hour DECIMAL(10,2) NULL,
                price_per_km DECIMAL(10,2) NULL,
                price DECIMAL(10,2) NULL,
                rating DECIMAL(3,2) DEFAULT 0.00,
                description TEXT,
                amenities JSON,
                max_guests INT DEFAULT 1,
                picture_url VARCHAR(500),
                status ENUM('active', 'inactive', 'pending') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
                INDEX idx_vendor_id (vendor_id),
                INDEX idx_service_id (service_id),
                INDEX idx_city (city),
                INDEX idx_type (type),
                INDEX idx_status (status),
                INDEX idx_rating (rating)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
        
        // Create bookings table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                vendor_id INT NOT NULL,
                service_id VARCHAR(50) NOT NULL,
                service_title VARCHAR(200) NOT NULL,
                service_type VARCHAR(50) NOT NULL,
                service_location VARCHAR(200) NOT NULL,
                booking_reference VARCHAR(20) UNIQUE NOT NULL,
                check_in_date DATE NOT NULL,
                check_out_date DATE NOT NULL,
                guests INT NOT NULL DEFAULT 1,
                contact_name VARCHAR(100) NOT NULL,
                contact_email VARCHAR(100) NOT NULL,
                contact_phone VARCHAR(20) NOT NULL,
                special_requests TEXT,
                total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
                status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
                payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
                INDEX idx_user_id (user_id),
                INDEX idx_vendor_id (vendor_id),
                INDEX idx_service_id (service_id),
                INDEX idx_booking_reference (booking_reference),
                INDEX idx_status (status),
                INDEX idx_dates (check_in_date, check_out_date),
                INDEX idx_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
        
        // Create contact_messages table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                subject VARCHAR(200) NOT NULL,
                message TEXT NOT NULL,
                newsletter_subscription TINYINT(1) DEFAULT 0,
                status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_status (status),
                INDEX idx_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
        
        // Create newsletter_subscribers table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) UNIQUE NOT NULL,
                name VARCHAR(200),
                status ENUM('active', 'inactive') DEFAULT 'active',
                subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_status (status)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
        
        // Insert default admin user if not exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = 'admin' LIMIT 1");
        $stmt->execute();
        if (!$stmt->fetch()) {
            $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute(['admin', 'admin@stayscape.com', $adminPassword, 'System Administrator', 'admin']);
        }
        
        // Insert sample vendor if not exists
        $stmt = $pdo->prepare("SELECT id FROM vendors WHERE username = 'vendor1' LIMIT 1");
        $stmt->execute();
        if (!$stmt->fetch()) {
            $vendorPassword = password_hash('vendor123', PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO vendors (username, email, password, full_name, phone, city, business_name, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute(['vendor1', 'vendor1@stayscape.com', $vendorPassword, 'Ahmed Khan', '+92 300 1234567', 'Lahore', 'Khan Services', 'active']);
        }
        
        return true;
    } catch (Exception $e) {
        error_log("Database initialization failed: " . $e->getMessage());
        return false;
    }
}

// Generate unique booking reference
function generateBookingReference() {
    return 'SS' . date('Y') . strtoupper(substr(uniqid(), -6));
}

// Calculate total price based on service and dates
function calculateTotalPrice($serviceId, $checkIn, $checkOut, $guests = 1) {
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT * FROM services WHERE service_id = ?");
        $stmt->execute([$serviceId]);
        $service = $stmt->fetch();
        
        if (!$service) {
            return 1000; // Default price if service not found
        }
        
        $checkInDate = new DateTime($checkIn);
        $checkOutDate = new DateTime($checkOut);
        $nights = $checkInDate->diff($checkOutDate)->days;
        
        if ($nights <= 0) {
            $nights = 1; // Minimum 1 night/day
        }
        
        $basePrice = 0;
        
        if ($service['price_per_night']) {
            $basePrice = $service['price_per_night'] * $nights;
        } elseif ($service['price_per_day']) {
            $basePrice = $service['price_per_day'] * $nights;
        } elseif ($service['price_per_hour']) {
            $basePrice = $service['price_per_hour'] * 4; // Assume 4 hours
        } elseif ($service['price_per_km']) {
            $basePrice = $service['price_per_km'] * 50; // Assume 50km
        } else {
            $basePrice = $service['price'] ?? 1000;
        }
        
        // Apply guest multiplier for certain service types
        if (in_array($service['type'], ['Experience', 'Adventure', 'Cultural']) && $guests > 1) {
            $basePrice *= $guests;
        }
        
        return $basePrice;
    } catch (Exception $e) {
        error_log("Price calculation error: " . $e->getMessage());
        return 1000; // Default price
    }
}

// Get service data from database
function getServiceData($serviceId) {
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("
            SELECT s.*, v.full_name as vendor_name, v.phone as vendor_phone, v.email as vendor_email 
            FROM services s 
            JOIN vendors v ON s.vendor_id = v.id 
            WHERE s.service_id = ? AND s.status = 'active'
        ");
        $stmt->execute([$serviceId]);
        $service = $stmt->fetch();
        
        if ($service && $service['amenities']) {
            $service['amenities'] = json_decode($service['amenities'], true);
        }
        
        return $service;
    } catch (Exception $e) {
        error_log("Get service data error: " . $e->getMessage());
        return null;
    }
}

// Send JSON response
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Validate required fields
function validateRequired($data, $requiredFields) {
    $errors = [];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $errors[] = ucfirst(str_replace('_', ' ', $field)) . ' is required';
        }
    }
    return $errors;
}

// Sanitize input
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

// Check if user is logged in
function isLoggedIn() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return isset($_SESSION['user_id']);
}

// Check if admin is logged in
function isAdminLoggedIn() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return isset($_SESSION['admin_id']) && $_SESSION['user_role'] === 'admin';
}

// Check if vendor is logged in
function isVendorLoggedIn() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return isset($_SESSION['vendor_id']);
}

// Get current user
function getCurrentUser() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    if (!isset($_SESSION['user_id'])) {
        return null;
    }
    
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT id, username, email, full_name, phone, role FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        return $stmt->fetch();
    } catch (Exception $e) {
        error_log("Error getting current user: " . $e->getMessage());
        return null;
    }
}

// Get current vendor
function getCurrentVendor() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    if (!isset($_SESSION['vendor_id'])) {
        return null;
    }
    
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT * FROM vendors WHERE id = ?");
        $stmt->execute([$_SESSION['vendor_id']]);
        return $stmt->fetch();
    } catch (Exception $e) {
        error_log("Error getting current vendor: " . $e->getMessage());
        return null;
    }
}

// Initialize database on first load
initializeDatabase();

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>