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
    case 'get_users':
        getAdminUsers();
        break;
    case 'get_vendors':
        getAdminVendors();
        break;
    case 'get_messages':
        getAdminMessages();
        break;
    case 'update_booking_status':
        updateBookingStatus();
        break;
    case 'update_vendor_status':
        updateVendorStatus();
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
        $stmt = $pdo->query("SELECT COUNT(*) as total_users FROM users WHERE role = 'user'");
        $totalUsers = $stmt->fetch()['total_users'];
        
        // Get total vendors
        $stmt = $pdo->query("SELECT COUNT(*) as total_vendors FROM vendors");
        $totalVendors = $stmt->fetch()['total_vendors'];
        
        // Get total revenue
        $stmt = $pdo->query("SELECT COALESCE(SUM(total_price), 0) as total_revenue FROM bookings WHERE status != 'cancelled'");
        $totalRevenue = $stmt->fetch()['total_revenue'];
        
        // Get monthly revenue
        $stmt = $pdo->query("SELECT COALESCE(SUM(total_price), 0) as monthly_revenue FROM bookings WHERE status != 'cancelled' AND MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())");
        $monthlyRevenue = $stmt->fetch()['monthly_revenue'];
        
        // Get active services
        $stmt = $pdo->query("SELECT COUNT(*) as active_services FROM services WHERE status = 'active'");
        $activeServices = $stmt->fetch()['active_services'];
        
        // Get pending approvals
        $stmt = $pdo->query("SELECT COUNT(*) as pending_approvals FROM vendors WHERE status = 'pending'");
        $pendingApprovals = $stmt->fetch()['pending_approvals'];
        
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
                'total_vendors' => $totalVendors,
                'total_revenue' => $totalRevenue,
                'monthly_revenue' => $monthlyRevenue,
                'active_services' => $activeServices,
                'pending_approvals' => $pendingApprovals,
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
            SELECT b.*, u.username
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

function getAdminUsers() {
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("
            SELECT id, username, email, full_name, phone, role, status, created_at
            FROM users 
            ORDER BY created_at DESC
        ");
        $stmt->execute();
        $users = $stmt->fetchAll();
        
        sendJsonResponse([
            'success' => true,
            'users' => $users
        ]);
        
    } catch (Exception $e) {
        error_log("Admin users error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load users'], 500);
    }
}

function getAdminVendors() {
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("
            SELECT *
            FROM vendors 
            ORDER BY created_at DESC
        ");
        $stmt->execute();
        $vendors = $stmt->fetchAll();
        
        sendJsonResponse([
            'success' => true,
            'vendors' => $vendors
        ]);
        
    } catch (Exception $e) {
        error_log("Admin vendors error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load vendors'], 500);
    }
}

function getAdminMessages() {
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("
            SELECT *
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

function updateVendorStatus() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
    $vendorId = (int)($_POST['vendor_id'] ?? 0);
    $status = sanitizeInput($_POST['status'] ?? '');
    
    $validStatuses = ['active', 'inactive', 'pending'];
    
    if (!$vendorId || !in_array($status, $validStatuses)) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid vendor ID or status'], 400);
    }
    
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("UPDATE vendors SET status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->execute([$status, $vendorId]);
        
        if ($stmt->rowCount() > 0) {
            sendJsonResponse([
                'success' => true,
                'message' => 'Vendor status updated successfully'
            ]);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Vendor not found'], 404);
        }
        
    } catch (Exception $e) {
        error_log("Update vendor status error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to update vendor status'], 500);
    }
}
?>