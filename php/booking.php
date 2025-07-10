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

if (!isLoggedIn()) {
    sendJsonResponse(['success' => false, 'message' => 'Please login to make a booking'], 401);
}

$action = $_POST['action'] ?? 'create';

switch ($action) {
    case 'create':
        createBooking();
        break;
    case 'cancel':
        cancelBooking();
        break;
    default:
        sendJsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
}

function createBooking() {
    $requiredFields = [
        'service_id', 'guests', 'check_in_date', 'check_out_date',
        'contact_name', 'contact_email', 'contact_phone'
    ];
    
    $errors = validateRequired($_POST, $requiredFields);
    
    if (!empty($errors)) {
        sendJsonResponse(['success' => false, 'message' => implode(', ', $errors)], 400);
    }
    
    $serviceId = sanitizeInput($_POST['service_id']);
    $guests = (int)$_POST['guests'];
    $checkInDate = $_POST['check_in_date'];
    $checkOutDate = $_POST['check_out_date'];
    $contactName = sanitizeInput($_POST['contact_name']);
    $contactEmail = sanitizeInput($_POST['contact_email']);
    $contactPhone = sanitizeInput($_POST['contact_phone']);
    $specialRequests = sanitizeInput($_POST['special_requests'] ?? '');
    
    // Validate dates
    $checkIn = new DateTime($checkInDate);
    $checkOut = new DateTime($checkOutDate);
    $today = new DateTime();
    
    if ($checkIn < $today) {
        sendJsonResponse(['success' => false, 'message' => 'Check-in date cannot be in the past'], 400);
    }
    
    if ($checkOut <= $checkIn) {
        sendJsonResponse(['success' => false, 'message' => 'Check-out date must be after check-in date'], 400);
    }
    
    // Validate email
    if (!filter_var($contactEmail, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid email format'], 400);
    }
    
    // Validate guests
    if ($guests < 1 || $guests > 50) {
        sendJsonResponse(['success' => false, 'message' => 'Number of guests must be between 1 and 50'], 400);
    }
    
    try {
        $pdo = getDBConnection();
        
        // Get service details from database
        $service = getServiceData($serviceId);
        
        if (!$service) {
            sendJsonResponse(['success' => false, 'message' => 'Service not found'], 404);
        }
        
        // Check guest capacity
        if ($guests > $service['max_guests']) {
            sendJsonResponse(['success' => false, 'message' => "Maximum {$service['max_guests']} guests allowed for this service"], 400);
        }
        
        // Calculate total price
        $totalPrice = calculateTotalPrice($serviceId, $checkInDate, $checkOutDate, $guests);
        
        // Generate booking reference
        $bookingReference = generateBookingReference();
        
        // Get current user
        $user = getCurrentUser();
        
        // Create booking in database
        $stmt = $pdo->prepare("
            INSERT INTO bookings (
                user_id, vendor_id, service_id, service_title, service_type, service_location,
                booking_reference, guests, check_in_date, check_out_date, total_price, 
                special_requests, contact_name, contact_email, contact_phone, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
        ");
        
        $result = $stmt->execute([
            $user['id'],
            $service['vendor_id'],
            $serviceId,
            $service['title'],
            $service['type'],
            $service['location'],
            $bookingReference,
            $guests,
            $checkInDate,
            $checkOutDate,
            $totalPrice,
            $specialRequests,
            $contactName,
            $contactEmail,
            $contactPhone
        ]);
        
        if (!$result) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to create booking'], 500);
        }
        
        $bookingId = $pdo->lastInsertId();
        
        // Log the booking creation
        error_log("Booking created successfully: ID {$bookingId}, Reference: {$bookingReference}");
        
        sendJsonResponse([
            'success' => true,
            'message' => 'Booking created successfully',
            'booking' => [
                'id' => $bookingId,
                'reference' => $bookingReference,
                'service_title' => $service['title'],
                'service_type' => $service['type'],
                'service_location' => $service['location'],
                'total_price' => $totalPrice,
                'check_in_date' => $checkInDate,
                'check_out_date' => $checkOutDate,
                'guests' => $guests,
                'contact_name' => $contactName,
                'contact_email' => $contactEmail,
                'contact_phone' => $contactPhone,
                'special_requests' => $specialRequests,
                'status' => 'confirmed'
            ]
        ]);
        
    } catch (Exception $e) {
        error_log("Booking creation error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Booking failed. Please try again. Error: ' . $e->getMessage()], 500);
    }
}

function cancelBooking() {
    if (!isset($_POST['booking_id'])) {
        sendJsonResponse(['success' => false, 'message' => 'Booking ID is required'], 400);
    }
    
    $bookingId = (int)$_POST['booking_id'];
    $user = getCurrentUser();
    
    try {
        $pdo = getDBConnection();
        
        // Check if booking exists and belongs to user
        $stmt = $pdo->prepare("SELECT id, status, booking_reference FROM bookings WHERE id = ? AND user_id = ?");
        $stmt->execute([$bookingId, $user['id']]);
        $booking = $stmt->fetch();
        
        if (!$booking) {
            sendJsonResponse(['success' => false, 'message' => 'Booking not found'], 404);
        }
        
        if ($booking['status'] === 'cancelled') {
            sendJsonResponse(['success' => false, 'message' => 'Booking is already cancelled'], 400);
        }
        
        // Update booking status
        $stmt = $pdo->prepare("UPDATE bookings SET status = 'cancelled', updated_at = NOW() WHERE id = ?");
        $result = $stmt->execute([$bookingId]);
        
        if (!$result) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to cancel booking'], 500);
        }
        
        sendJsonResponse([
            'success' => true,
            'message' => 'Booking cancelled successfully',
            'booking_reference' => $booking['booking_reference']
        ]);
        
    } catch (Exception $e) {
        error_log("Booking cancellation error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Cancellation failed. Please try again.'], 500);
    }
}
?>