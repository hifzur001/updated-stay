<?php
require_once 'config.php';

header('Content-Type: application/json');

// Check if admin is logged in
if (!isAdminLoggedIn()) {
    sendJsonResponse(['success' => false, 'message' => 'Admin access required'], 401);
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'get_stats':
        getAdminStats();
        break;
    case 'get_bookings':
        getAdminBookings();
        break;
    case 'get_messages':
        getAdminMessages();
        break;
    case 'update_booking_status':
        updateBookingStatus();
        break;
    default:
        sendJsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
}

function getAdminStats() {
    try {
        $pdo = getDBConnection();
        
        // Get total bookings
        $stmt = $pdo->query("SELECT COUNT(*) as total_bookings FROM bookings");
        $totalBookings = $stmt->fetch()['total_bookings'];
        
        // Get total users
        $stmt = $pdo->query("SELECT COUNT(*) as total_users FROM users");
        $totalUsers = $stmt->fetch()['total_users'];
        
        // Get total revenue
        $stmt = $pdo->query("SELECT COALESCE(SUM(total_price), 0) as total_revenue FROM bookings WHERE status != 'cancelled'");
        $totalRevenue = $stmt->fetch()['total_revenue'];
        
        // Get total messages
        $stmt = $pdo->query("SELECT COUNT(*) as total_messages FROM contact_messages");
        $totalMessages = $stmt->fetch()['total_messages'];
        
        // Get recent bookings
        $stmt = $pdo->prepare("
            SELECT b.*, u.username 
            FROM bookings b 
            JOIN users u ON b.user_id = u.id 
            ORDER BY b.created_at DESC 
            LIMIT 10
        ");
        $stmt->execute();
        $recentBookings = $stmt->fetchAll();
        
        sendJsonResponse([
            'success' => true,
            'stats' => [
                'total_bookings' => $totalBookings,
                'total_users' => $totalUsers,
                'total_revenue' => $totalRevenue,
                'total_messages' => $totalMessages,
                'recent_bookings' => $recentBookings
            ]
        ]);
        
    } catch (Exception $e) {
        error_log("Admin stats error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load stats'], 500);
    }
}

function getAdminBookings() {
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("
            SELECT b.*, u.username,
                   DATE_FORMAT(b.check_in_date, '%M %d, %Y') as check_in_date_formatted,
                   DATE_FORMAT(b.check_out_date, '%M %d, %Y') as check_out_date_formatted,
                   CONCAT('PKR ', FORMAT(b.total_price, 0)) as total_price_formatted
            FROM bookings b 
            JOIN users u ON b.user_id = u.id 
            ORDER BY b.created_at DESC
        ");
        $stmt->execute();
        $bookings = $stmt->fetchAll();
        
        sendJsonResponse([
            'success' => true,
            'bookings' => $bookings
        ]);
        
    } catch (Exception $e) {
        error_log("Admin bookings error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load bookings'], 500);
    }
}

function getAdminMessages() {
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("
            SELECT *,
                   CONCAT(first_name, ' ', last_name) as full_name,
                   DATE_FORMAT(created_at, '%M %d, %Y at %h:%i %p') as created_at_formatted
            FROM contact_messages 
            ORDER BY created_at DESC
        ");
        $stmt->execute();
        $messages = $stmt->fetchAll();
        
        sendJsonResponse([
            'success' => true,
            'messages' => $messages
        ]);
        
    } catch (Exception $e) {
        error_log("Admin messages error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load messages'], 500);
    }
}

function updateBookingStatus() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
    $bookingId = (int)($_POST['booking_id'] ?? 0);
    $status = sanitizeInput($_POST['status'] ?? '');
    
    $validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    
    if (!$bookingId || !in_array($status, $validStatuses)) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid booking ID or status'], 400);
    }
    
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("UPDATE bookings SET status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->execute([$status, $bookingId]);
        
        if ($stmt->rowCount() > 0) {
            sendJsonResponse([
                'success' => true,
                'message' => 'Booking status updated successfully'
            ]);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Booking not found'], 404);
        }
        
    } catch (Exception $e) {
        error_log("Update booking status error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to update booking status'], 500);
    }
}
?>
