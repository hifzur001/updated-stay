<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'city_services_db');

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
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_username (username),
                INDEX idx_email (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
        
        // Create bookings table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
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
                status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                INDEX idx_user_id (user_id),
                INDEX idx_service_id (service_id),
                INDEX idx_booking_reference (booking_reference),
                INDEX idx_status (status),
                INDEX idx_dates (check_in_date, check_out_date)
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
        
        return true;
    } catch (Exception $e) {
        error_log("Database initialization failed: " . $e->getMessage());
        return false;
    }
}

// Generate unique booking reference
function generateBookingReference() {
    return 'CS' . date('Y') . strtoupper(substr(uniqid(), -6));
}

// Calculate total price based on service and dates
function calculateTotalPrice($serviceId, $checkIn, $checkOut, $guests = 1) {
    $checkInDate = new DateTime($checkIn);
    $checkOutDate = new DateTime($checkOut);
    $nights = $checkInDate->diff($checkOutDate)->days;
    
    if ($nights <= 0) {
        $nights = 1; // Minimum 1 night/day
    }
    
    // Service pricing data
    $servicePricing = [
        'lahore-1' => ['price_per_night' => 12000, 'type' => 'Accommodation'],
        'lahore-2' => ['price' => 3000, 'type' => 'Experience'],
        'lahore-3' => ['price_per_day' => 4500, 'type' => 'Food & Dining'],
        'lahore-4' => ['price_per_hour' => 2500, 'type' => 'Transportation'],
        'lahore-5' => ['price' => 5500, 'type' => 'Adventure'],
        'karachi-1' => ['price_per_night' => 8500, 'type' => 'Accommodation'],
        'karachi-2' => ['price' => 4500, 'type' => 'Experience'],
        'karachi-3' => ['price_per_km' => 25, 'type' => 'Transportation'],
        'karachi-4' => ['price' => 2500, 'type' => 'Cultural'],
        'islamabad-1' => ['price_per_night' => 9500, 'type' => 'Accommodation'],
        'islamabad-2' => ['price' => 1500, 'type' => 'Cultural'],
        'islamabad-3' => ['price' => 2000, 'type' => 'Adventure']
    ];
    
    $pricing = $servicePricing[$serviceId] ?? ['price' => 1000, 'type' => 'Other'];
    $basePrice = 0;
    
    if (isset($pricing['price_per_night'])) {
        $basePrice = $pricing['price_per_night'] * $nights;
    } elseif (isset($pricing['price_per_day'])) {
        $basePrice = $pricing['price_per_day'] * $nights;
    } elseif (isset($pricing['price_per_hour'])) {
        $basePrice = $pricing['price_per_hour'] * 4; // Assume 4 hours
    } elseif (isset($pricing['price_per_km'])) {
        $basePrice = $pricing['price_per_km'] * 50; // Assume 50km
    } else {
        $basePrice = $pricing['price'];
    }
    
    // Apply guest multiplier for certain service types
    if (in_array($pricing['type'], ['Experience', 'Adventure', 'Cultural']) && $guests > 1) {
        $basePrice *= $guests;
    }
    
    return $basePrice;
}

// Get service data
function getServiceData($serviceId) {
    $servicesData = [
        'lahore-1' => [
            'id' => 'lahore-1',
            'title' => 'Luxury Villa in DHA Phase 5',
            'type' => 'Accommodation',
            'city' => 'Lahore',
            'location' => 'DHA Phase 5, Lahore',
            'maxGuests' => 8
        ],
        'lahore-2' => [
            'id' => 'lahore-2',
            'title' => 'Old City Heritage Food Tour',
            'type' => 'Experience',
            'city' => 'Lahore',
            'location' => 'Gawalmandi, Lahore',
            'maxGuests' => 12
        ],
        'lahore-3' => [
            'id' => 'lahore-3',
            'title' => 'Traditional Punjabi Cooking Class',
            'type' => 'Food & Dining',
            'city' => 'Lahore',
            'location' => 'Model Town, Lahore',
            'maxGuests' => 8
        ],
        'lahore-4' => [
            'id' => 'lahore-4',
            'title' => 'Private Car with Driver',
            'type' => 'Transportation',
            'city' => 'Lahore',
            'location' => 'Lahore City',
            'maxGuests' => 4
        ],
        'lahore-5' => [
            'id' => 'lahore-5',
            'title' => 'Shalimar Gardens Photography Tour',
            'type' => 'Adventure',
            'city' => 'Lahore',
            'location' => 'Shalimar Gardens, Lahore',
            'maxGuests' => 6
        ],
        'karachi-1' => [
            'id' => 'karachi-1',
            'title' => 'Clifton Beach Luxury Apartment',
            'type' => 'Accommodation',
            'city' => 'Karachi',
            'location' => 'Clifton Block 4, Karachi',
            'maxGuests' => 6
        ],
        'karachi-2' => [
            'id' => 'karachi-2',
            'title' => 'Karachi Street Food Adventure',
            'type' => 'Experience',
            'city' => 'Karachi',
            'location' => 'Burns Road, Karachi',
            'maxGuests' => 10
        ],
        'karachi-3' => [
            'id' => 'karachi-3',
            'title' => 'Airport Transfer Service',
            'type' => 'Transportation',
            'city' => 'Karachi',
            'location' => 'Jinnah International Airport',
            'maxGuests' => 4
        ],
        'karachi-4' => [
            'id' => 'karachi-4',
            'title' => 'Mohatta Palace Cultural Tour',
            'type' => 'Cultural',
            'city' => 'Karachi',
            'location' => 'Clifton, Karachi',
            'maxGuests' => 15
        ],
        'islamabad-1' => [
            'id' => 'islamabad-1',
            'title' => 'Margalla Hills Eco Resort',
            'type' => 'Accommodation',
            'city' => 'Islamabad',
            'location' => 'Margalla Hills, Islamabad',
            'maxGuests' => 4
        ],
        'islamabad-2' => [
            'id' => 'islamabad-2',
            'title' => 'Faisal Mosque Guided Tour',
            'type' => 'Cultural',
            'city' => 'Islamabad',
            'location' => 'Faisal Mosque, Islamabad',
            'maxGuests' => 20
        ],
        'islamabad-3' => [
            'id' => 'islamabad-3',
            'title' => 'Margalla Hills Hiking Experience',
            'type' => 'Adventure',
            'city' => 'Islamabad',
            'location' => 'Margalla Hills National Park',
            'maxGuests' => 8
        ]
    ];
    
    return $servicesData[$serviceId] ?? null;
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
        $stmt = $pdo->prepare("SELECT id, username, email, full_name, phone FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        return $stmt->fetch();
    } catch (Exception $e) {
        error_log("Error getting current user: " . $e->getMessage());
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
