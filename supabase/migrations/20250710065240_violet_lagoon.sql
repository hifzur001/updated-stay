-- StayScape Database Initialization Script
-- Run this script to set up the complete database structure

-- Create database
CREATE DATABASE IF NOT EXISTS stayscape_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE stayscape_db;

-- Users table (includes admin users)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vendors table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Services table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bookings table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact messages table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200),
    status ENUM('active', 'inactive') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user
INSERT IGNORE INTO users (username, email, password, full_name, role, status) VALUES 
('admin', 'admin@stayscape.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'admin', 'active');

-- Insert sample test user
INSERT IGNORE INTO users (username, email, password, full_name, phone, role, status) VALUES 
('testuser', 'test@stayscape.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test User', '+92 300 0000000', 'user', 'active');

-- Insert sample vendors
INSERT IGNORE INTO vendors (username, email, password, full_name, phone, city, business_name, status) VALUES 
('vendor1', 'vendor1@stayscape.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ahmed Khan', '+92 300 1234567', 'Lahore', 'Khan Services', 'active'),
('vendor2', 'vendor2@stayscape.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Zara Ahmed', '+92 305 1234567', 'Karachi', 'Zara Hospitality', 'active'),
('vendor3', 'vendor3@stayscape.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. Sarah Khan', '+92 308 1234567', 'Islamabad', 'Mountain View Resort', 'active');

-- Insert sample services
INSERT IGNORE INTO services (vendor_id, service_id, title, type, city, location, price_per_night, rating, description, amenities, max_guests, picture_url, status) VALUES 
(1, 'lahore-1', 'Luxury Villa in DHA Phase 5', 'Accommodation', 'Lahore', 'DHA Phase 5, Lahore', 12000.00, 4.8, 'Luxurious villa with modern amenities in the heart of DHA Phase 5', '["WiFi", "AC", "Parking", "Security", "Garden"]', 8, 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 'active'),
(2, 'karachi-1', 'Clifton Beach Luxury Apartment', 'Accommodation', 'Karachi', 'Clifton Block 4, Karachi', 8500.00, 4.7, 'Luxury apartment with sea view in Clifton', '["Sea View", "WiFi", "AC", "Parking"]', 6, 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg', 'active'),
(3, 'islamabad-1', 'Margalla Hills Eco Resort', 'Accommodation', 'Islamabad', 'Margalla Hills, Islamabad', 9500.00, 4.9, 'Eco-friendly resort in the Margalla Hills', '["Mountain View", "Hiking Trails", "Organic Food"]', 4, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'active');

INSERT IGNORE INTO services (vendor_id, service_id, title, type, city, location, price, rating, description, amenities, max_guests, picture_url, status) VALUES 
(1, 'lahore-2', 'Old City Heritage Food Tour', 'Experience', 'Lahore', 'Gawalmandi, Lahore', 3000.00, 4.9, 'Authentic food tour through Lahore historic old city', '["Guide", "Food Tastings", "Transportation"]', 12, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'active'),
(2, 'karachi-2', 'Manora Island Deep Sea Fishing', 'Experience', 'Karachi', 'Manora Island, Karachi', 4500.00, 4.8, 'Deep sea fishing experience around Manora Island', '["Boat", "Equipment", "Lunch", "Guide"]', 8, 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg', 'active'),
(3, 'islamabad-2', 'Margalla Hills Hiking', 'Adventure', 'Islamabad', 'Margalla Hills National Park', 1500.00, 4.6, 'Guided hiking tours in Margalla Hills', '["Guide", "Water", "First Aid", "Nature Experience"]', 15, 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg', 'active');

-- Note: Password for all test accounts is 'password' (hashed with bcrypt)
-- Admin: admin / admin123
-- Vendor: vendor1 / vendor123  
-- User: testuser / password