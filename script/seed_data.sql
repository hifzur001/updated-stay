-- Insert additional sample data for testing
USE stayscape_db;

-- Insert more users
INSERT INTO users (username, email, password, full_name, phone) VALUES
('john_doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John Doe', '+92 300 1111111'),
('jane_smith', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane Smith', '+92 301 2222222'),
('ali_ahmed', 'ali@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ali Ahmed', '+92 302 3333333'),
('sara_khan', 'sara@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sara Khan', '+92 303 4444444'),
('testuser', 'test@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test User', '+92 300 0000000'),
('admin', 'admin@stayscape.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', '+92 300 1111111');

-- Insert more services
INSERT INTO services (id, title, type, city, location, price_per_night, price_per_day, price, rating, description, amenities, max_guests, broker_name, broker_phone, broker_email, picture_url) VALUES
('lahore-6', 'Boutique Hotel in Gulberg', 'Accommodation', 'Lahore', 'Gulberg III, Lahore', 7500.00, NULL, NULL, 4.5, 'Modern boutique hotel in the heart of Gulberg', '["WiFi", "AC", "Restaurant", "Gym"]', 4, 'Hotel Manager', '+92 304 1111111', 'manager@hotel.com', 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg'),
('karachi-5', 'Karachi City Tour', 'Experience', 'Karachi', 'Various Locations, Karachi', NULL, NULL, 3500.00, 4.6, 'Comprehensive city tour covering major attractions', '["Guide", "Transportation", "Lunch"]', 15, 'Tour Guide Hassan', '+92 305 2222222', 'hassan@tours.com', 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg'),
('islamabad-4', 'Corporate Meeting Room', 'Business', 'Islamabad', 'Blue Area, Islamabad', NULL, 5000.00, NULL, 4.3, 'Professional meeting room with modern facilities', '["Projector", "WiFi", "Catering", "Parking"]', 20, 'Business Center', '+92 306 3333333', 'info@business.com', 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg'),
('peshawar-4', 'Traditional Handicrafts Workshop', 'Cultural', 'Peshawar', 'Peshawar Bazaar', NULL, NULL, 2000.00, 4.7, 'Learn traditional Peshawari handicrafts', '["Materials", "Expert Instructor", "Certificate"]', 8, 'Master Craftsman', '+92 307 4444444', 'crafts@peshawar.com', 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg');

INSERT INTO services (id, title, type, city, location, price_per_day, rating, description, amenities, max_guests, broker_name, broker_phone, broker_email, picture_url) VALUES
('lahore-3', 'Premium Car Rental Service', 'Transportation', 'Lahore', 'City-wide, Lahore', 4500.00, 4.4, 'Premium car rental with professional driver', '["Professional Driver", "Fuel Included", "Insurance", "GPS"]', 4, 'Muhammad Hassan', '+92 302 3456789', 'hassan@stayscape.com', 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg');

INSERT INTO services (id, title, type, city, location, price_per_hour, rating, description, amenities, max_guests, broker_name, broker_phone, broker_email, picture_url) VALUES
('lahore-4', 'Spa & Wellness Center', 'Wellness', 'Lahore', 'Gulberg, Lahore', 2500.00, 4.6, 'Premium spa and wellness treatments', '["Massage", "Facial", "Aromatherapy", "Relaxation"]', 2, 'Dr. Ayesha Khan', '+92 303 4567890', 'ayesha@stayscape.com', 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg');

INSERT INTO services (id, title, type, city, location, price, rating, description, amenities, max_guests, broker_name, broker_phone, broker_email, picture_url) VALUES
('lahore-5', 'River Rafting Adventure', 'Adventure', 'Lahore', 'River Ravi, Lahore', 5500.00, 4.7, 'Thrilling river rafting experience', '["Equipment", "Guide", "Safety Gear", "Lunch"]', 8, 'Captain Ali', '+92 304 5678901', 'ali@stayscape.com', 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'),
('karachi-2', 'Manora Island Deep Sea Fishing', 'Experience', 'Karachi', 'Manora Island, Karachi', 4500.00, 4.8, 'Deep sea fishing experience around Manora Island', '["Boat", "Equipment", "Lunch", "Guide"]', 8, 'Captain Rashid', '+92 306 2345678', 'rashid@stayscape.com', 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg');

INSERT INTO services (id, title, type, city, location, price_per_km, rating, description, amenities, max_guests, broker_name, broker_phone, broker_email, picture_url) VALUES
('karachi-3', 'Airport Transfer Service', 'Transportation', 'Karachi', 'Karachi Airport', 25.00, 4.5, 'Reliable airport transfer service', '["24/7 Available", "Professional Driver", "Clean Vehicle"]', 4, 'Tariq Malik', '+92 307 3456789', 'tariq@stayscape.com', 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg');

INSERT INTO services (id, title, type, city, location, price, rating, description, amenities, max_guests, broker_name, broker_phone, broker_email, picture_url) VALUES
('karachi-4', 'Street Food Tour', 'Food & Dining', 'Karachi', 'Burns Road, Karachi', 2500.00, 4.9, 'Authentic Karachi street food experience', '["Guide", "Food Tastings", "Drinks", "Cultural Experience"]', 10, 'Chef Salman', '+92 308 4567890', 'salman@stayscape.com', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'),
('islamabad-2', 'Margalla Hills Hiking', 'Adventure', 'Islamabad', 'Margalla Hills National Park', 1500.00, 4.6, 'Guided hiking tours in Margalla Hills', '["Guide", "Water", "First Aid", "Nature Experience"]', 15, 'Hiking Guide Ahmad', '+92 309 2345678', 'ahmad@stayscape.com', 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'),
('islamabad-3', 'Faisal Mosque & Monument Tour', 'Cultural', 'Islamabad', 'Islamabad City', 2000.00, 4.8, 'Cultural tour of Islamabad landmarks', '["Guide", "Transportation", "Entry Fees", "Cultural Experience"]', 12, 'Tour Guide Fatima', '+92 310 3456789', 'fatima.guide@stayscape.com', 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg');

-- Insert sample bookings
INSERT INTO bookings (user_id, service_id, service_title, service_type, service_location, guests, check_in_date, check_out_date, total_price, contact_name, contact_email, contact_phone, booking_reference, status) VALUES
(1, 'lahore-1', 'Luxury Villa in DHA Phase 5', 'Accommodation', 'DHA Phase 5, Lahore', 4, '2024-02-15', '2024-02-17', 24000.00, 'John Doe', 'john@example.com', '+92 300 1111111', 'SS202401', 'confirmed'),
(2, 'karachi-2', 'Manora Island Deep Sea Fishing', 'Experience', 'Manora Island, Karachi', 6, '2024-02-20', '2024-02-20', 4500.00, 'Jane Smith', 'jane@example.com', '+92 301 2222222', 'SS202402', 'pending'),
(3, 'islamabad-1', 'Margalla Hills Eco Resort', 'Accommodation', 'Margalla Hills, Islamabad', 2, '2024-02-25', '2024-02-27', 19000.00, 'Ali Ahmed', 'ali@example.com', '+92 302 3333333', 'SS202403', 'confirmed'),
(4, 'lahore-2', 'Old City Heritage Food Tour', 'Experience', 'Gawalmandi, Lahore', 8, '2024-03-01', '2024-03-01', 24000.00, 'Sara Khan', 'sara@example.com', '+92 303 4444444', 'SS202404', 'completed'),
(1, 'lahore-1', 'Luxury Villa in DHA Phase 5', 'Accommodation', 'DHA Phase 5, Lahore', 4, '2024-02-15', '2024-02-17', 24000.00, 'Test User', 'test@example.com', '+92 300 0000000', 'SS2024ABC123', 'confirmed'),
(1, 'karachi-1', 'Clifton Beach Luxury Apartment', 'Accommodation', 'Clifton Block 4, Karachi', 2, '2024-03-01', '2024-03-03', 17000.00, 'Test User', 'test@example.com', '+92 300 0000000', 'SS2024DEF456', 'confirmed');

-- Insert sample contact messages
INSERT INTO contact_messages (first_name, last_name, email, phone, subject, message, newsletter_subscription, status) VALUES
('Ahmed', 'Ali', 'ahmed.ali@email.com', '+92 300 5555555', 'booking', 'I need help with my booking for next week', 1, 'new'),
('Fatima', 'Sheikh', 'fatima@email.com', '+92 301 6666666', 'general', 'What are your best packages for families?', 0, 'read'),
('Hassan', 'Khan', 'hassan@email.com', '+92 302 7777777', 'complaint', 'The service was not as described', 0, 'replied'),
('Zara', 'Ahmed', 'zara@email.com', '+92 303 8888888', 'suggestion', 'You should add more services in Faisalabad', 1, 'new');

-- Insert newsletter subscribers
INSERT INTO newsletter_subscribers (email, name, status) VALUES
('subscriber1@email.com', 'Subscriber One', 'active'),
('subscriber2@email.com', 'Subscriber Two', 'active'),
('subscriber3@email.com', 'Subscriber Three', 'inactive');
