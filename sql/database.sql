-- Create database
CREATE DATABASE IF NOT EXISTS stayscape_db;
USE stayscape_db;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table (for reference)
CREATE TABLE services (
    id VARCHAR(50) PRIMARY KEY,
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
    broker_name VARCHAR(100),
    broker_phone VARCHAR(20),
    broker_email VARCHAR(100),
    picture_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id VARCHAR(50) NOT NULL,
    service_title VARCHAR(200) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    service_location VARCHAR(200) NOT NULL,
    guests INT NOT NULL DEFAULT 1,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    special_requests TEXT,
    contact_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_bookings (user_id),
    INDEX idx_booking_reference (booking_reference),
    INDEX idx_booking_status (status)
);

-- Contact messages table
CREATE TABLE contact_messages (
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200),
    status ENUM('active', 'inactive') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample services data
INSERT INTO services (id, title, type, city, location, price_per_night, rating, description, amenities, max_guests, broker_name, broker_phone, broker_email, picture_url) VALUES
('lahore-1', 'Luxury Villa in DHA Phase 5', 'Accommodation', 'Lahore', 'DHA Phase 5, Lahore', 12000.00, 4.8, 'Luxurious villa with modern amenities in the heart of DHA Phase 5', '["WiFi", "AC", "Parking", "Security", "Garden"]', 8, 'Ahmed Khan', '+92 300 1234567', 'ahmed@stayscape.com', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'),
('lahore-2', 'Old City Heritage Food Tour', 'Experience', 'Lahore', 'Gawalmandi, Lahore', NULL, 4.9, 'Authentic food tour through Lahore historic old city', '["Guide", "Food Tastings", "Transportation"]', 12, 'Fatima Ali', '+92 301 2345678', 'fatima@stayscape.com', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'),
('karachi-1', 'Clifton Beach Luxury Apartment', 'Accommodation', 'Karachi', 'Clifton Block 4, Karachi', 8500.00, 4.7, 'Luxury apartment with sea view in Clifton', '["Sea View", "WiFi", "AC", "Parking"]', 6, 'Zara Ahmed', '+92 305 1234567', 'zara@stayscape.com', 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg'),
('islamabad-1', 'Margalla Hills Eco Resort', 'Accommodation', 'Islamabad', 'Margalla Hills, Islamabad', 9500.00, 4.9, 'Eco-friendly resort in the Margalla Hills', '["Mountain View", "Hiking Trails", "Organic Food"]', 4, 'Dr. Sarah Khan', '+92 308 1234567', 'sarah@stayscape.com', 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg');

-- Create indexes for better performance
CREATE INDEX idx_services_city ON services(city);
CREATE INDEX idx_services_type ON services(type);
CREATE INDEX idx_services_rating ON services(rating);
