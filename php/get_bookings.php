<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if (!isLoggedIn()) {
    sendJsonResponse(['success' => false, 'message' => 'Please login to view bookings'], 401);
}

$action = $_GET['action'] ?? $_POST['action'] ?? 'get_user_bookings';

switch ($action) {
    case 'get_user_bookings':
        getUserBookings();
        break;
    case 'get_booking_details':
        getBookingDetails();
        break;
    default:
        sendJsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
}

function getUserBookings() {
    $user = getCurrentUser();
    
    if (!$user) {
        sendJsonResponse(['success' => false, 'message' => 'User not found'], 404);
    }
    
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("
            SELECT 
                id,
                service_id,
                service_title,
                service_type,
                service_location,
                booking_reference,
                check_in_date,
                check_out_date,
                guests,
                total_price,
                status,
                contact_name,
                contact_email,
                contact_phone,
                special_requests,
                created_at,
                updated_at
            FROM bookings 
            WHERE user_id = ? 
            ORDER BY created_at DESC
        ");
        
        $stmt->execute([$user['id']]);
        $bookings = $stmt->fetchAll();
        
        // Format dates and add additional info
        foreach ($bookings as &$booking) {
            $booking['check_in_date_formatted'] = date('M d, Y', strtotime($booking['check_in_date']));
            $booking['check_out_date_formatted'] = date('M d, Y', strtotime($booking['check_out_date']));
            $booking['created_at_formatted'] = date('M d, Y g:i A', strtotime($booking['created_at']));
            $booking['total_price_formatted'] = 'PKR ' . number_format($booking['total_price'], 0);
            
            // Calculate nights/days
            $checkIn = new DateTime($booking['check_in_date']);
            $checkOut = new DateTime($booking['check_out_date']);
            $booking['duration_nights'] = $checkIn->diff($checkOut)->days;
            
            // Status badge class for frontend
            $booking['status_class'] = getStatusClass($booking['status']);
            $booking['status_label'] = ucfirst($booking['status']);
            
            // Check if booking can be cancelled
            $booking['can_cancel'] = in_array($booking['status'], ['pending', 'confirmed']) && 
                                   new DateTime($booking['check_in_date']) > new DateTime('+1 day');
        }
        
        sendJsonResponse([
            'success' => true,
            'bookings' => $bookings,
            'total_bookings' => count($bookings)
        ]);
        
    } catch (Exception $e) {
        error_log("Get bookings error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to retrieve bookings'], 500);
    }
}

function getBookingDetails() {
    $bookingId = $_GET['booking_id'] ?? $_POST['booking_id'] ?? null;
    
    if (!$bookingId) {
        sendJsonResponse(['success' => false, 'message' => 'Booking ID is required'], 400);
    }
    
    $user = getCurrentUser();
    
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("
            SELECT 
                b.*,
                u.username,
                u.email as user_email,
                u.full_name as user_full_name,
                u.phone as user_phone
            FROM bookings b
            JOIN users u ON b.user_id = u.id
            WHERE b.id = ? AND b.user_id = ?
        ");
        
        $stmt->execute([$bookingId, $user['id']]);
        $booking = $stmt->fetch();
        
        if (!$booking) {
            sendJsonResponse(['success' => false, 'message' => 'Booking not found'], 404);
        }
        
        // Format booking data
        $booking['check_in_date_formatted'] = date('M d, Y', strtotime($booking['check_in_date']));
        $booking['check_out_date_formatted'] = date('M d, Y', strtotime($booking['check_out_date']));
        $booking['created_at_formatted'] = date('M d, Y g:i A', strtotime($booking['created_at']));
        $booking['total_price_formatted'] = 'PKR ' . number_format($booking['total_price'], 0);
        
        // Calculate nights/days
        $checkIn = new DateTime($booking['check_in_date']);
        $checkOut = new DateTime($booking['check_out_date']);
        $booking['duration_nights'] = $checkIn->diff($checkOut)->days;
        
        $booking['status_class'] = getStatusClass($booking['status']);
        
        sendJsonResponse([
            'success' => true,
            'booking' => $booking
        ]);
        
    } catch (Exception $e) {
        error_log("Get booking details error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to retrieve booking details'], 500);
    }
}

function getStatusClass($status) {
    switch ($status) {
        case 'confirmed':
            return 'success';
        case 'pending':
            return 'warning';
        case 'cancelled':
            return 'danger';
        case 'completed':
            return 'info';
        default:
            return 'secondary';
    }
}
?>