<?php
require_once 'config.php';

header('Content-Type: application/json');

// Check if vendor is logged in
if (!isVendorLoggedIn()) {
    sendJsonResponse(['success' => false, 'message' => 'Vendor access required'], 401);
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'get_stats':
        getVendorStats();
        break;
    case 'get_bookings':
        getVendorBookings();
        break;
    case 'get_services':
        getVendorServices();
        break;
    case 'update_booking_status':
        updateBookingStatus();
        break;
    default:
        sendJsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
}

function getVendorStats() {
    try {
        $vendor = getCurrentVendor();
        if (!$vendor) {
            sendJsonResponse(['success' => false, 'message' => 'Vendor not found'], 404);
        }

        $pdo = getDBConnection();
        
        // Get total services
        $stmt = $pdo->prepare("SELECT COUNT(*) as total_services FROM services WHERE vendor_id = ?");
        $stmt->execute([$vendor['id']]);
        $totalServices = $stmt->fetch()['total_services'];
        
        // Get active services
        $stmt = $pdo->prepare("SELECT COUNT(*) as active_services FROM services WHERE vendor_id = ? AND status = 'active'");
        $stmt->execute([$vendor['id']]);
        $activeServices = $stmt->fetch()['active_services'];
        
        // Get total bookings
        $stmt = $pdo->prepare("SELECT COUNT(*) as total_bookings FROM bookings WHERE vendor_id = ?");
        $stmt->execute([$vendor['id']]);
        $totalBookings = $stmt->fetch()['total_bookings'];
        
        // Get pending bookings
        $stmt = $pdo->prepare("SELECT COUNT(*) as pending_bookings FROM bookings WHERE vendor_id = ? AND status = 'pending'");
        $stmt->execute([$vendor['id']]);
        $pendingBookings = $stmt->fetch()['pending_bookings'];
        
        // Get total revenue
        $stmt = $pdo->prepare("SELECT COALESCE(SUM(total_price), 0) as total_revenue FROM bookings WHERE vendor_id = ? AND status != 'cancelled'");
        $stmt->execute([$vendor['id']]);
        $totalRevenue = $stmt->fetch()['total_revenue'];
        
        // Get monthly earnings
        $stmt = $pdo->prepare("SELECT COALESCE(SUM(total_price), 0) as monthly_earnings FROM bookings WHERE vendor_id = ? AND status != 'cancelled' AND MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())");
        $stmt->execute([$vendor['id']]);
        $monthlyEarnings = $stmt->fetch()['monthly_earnings'];
        
        // Get recent bookings
        $stmt = $pdo->prepare("
            SELECT b.*, u.username 
            FROM bookings b 
            JOIN users u ON b.user_id = u.id 
            WHERE b.vendor_id = ?
            ORDER BY b.created_at DESC 
            LIMIT 10
        ");
        $stmt->execute([$vendor['id']]);
        $recentBookings = $stmt->fetchAll();
        
        sendJsonResponse([
            'success' => true,
            'stats' => [
                'total_services' => $totalServices,
                'active_services' => $activeServices,
                'total_bookings' => $totalBookings,
                'pending_bookings' => $pendingBookings,
                'total_revenue' => $totalRevenue,
                'monthly_earnings' => $monthlyEarnings,
                'recent_bookings' => $recentBookings
            ]
        ]);
        
    } catch (Exception $e) {
        error_log("Vendor stats error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load stats'], 500);
    }
}

function getVendorBookings() {
    try {
        $vendor = getCurrentVendor();
        if (!$vendor) {
            sendJsonResponse(['success' => false, 'message' => 'Vendor not found'], 404);
        }

        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("
            SELECT b.*, u.username
            FROM bookings b 
            JOIN users u ON b.user_id = u.id 
            WHERE b.vendor_id = ?
            ORDER BY b.created_at DESC
        ");
        $stmt->execute([$vendor['id']]);
        $bookings = $stmt->fetchAll();
        
        sendJsonResponse([
            'success' => true,
            'bookings' => $bookings
        ]);
        
    } catch (Exception $e) {
        error_log("Vendor bookings error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load bookings'], 500);
    }
}

function getVendorServices() {
    try {
        $vendor = getCurrentVendor();
        if (!$vendor) {
            sendJsonResponse(['success' => false, 'message' => 'Vendor not found'], 404);
        }

        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("
            SELECT *
            FROM services 
            WHERE vendor_id = ?
            ORDER BY created_at DESC
        ");
        $stmt->execute([$vendor['id']]);
        $services = $stmt->fetchAll();
        
        sendJsonResponse([
            'success' => true,
            'services' => $services
        ]);
        
    } catch (Exception $e) {
        error_log("Vendor services error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load services'], 500);
    }
}

function updateBookingStatus() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
    $vendor = getCurrentVendor();
    if (!$vendor) {
        sendJsonResponse(['success' => false, 'message' => 'Vendor not found'], 404);
    }
    
    $bookingId = (int)($_POST['booking_id'] ?? 0);
    $status = sanitizeInput($_POST['status'] ?? '');
    
    $validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    
    if (!$bookingId || !in_array($status, $validStatuses)) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid booking ID or status'], 400);
    }
    
    try {
        $pdo = getDBConnection();
        
        // Check if booking belongs to this vendor
        $stmt = $pdo->prepare("SELECT id FROM bookings WHERE id = ? AND vendor_id = ?");
        $stmt->execute([$bookingId, $vendor['id']]);
        if (!$stmt->fetch()) {
            sendJsonResponse(['success' => false, 'message' => 'Booking not found or access denied'], 404);
        }
        
        $stmt = $pdo->prepare("UPDATE bookings SET status = ?, updated_at = NOW() WHERE id = ? AND vendor_id = ?");
        $stmt->execute([$status, $bookingId, $vendor['id']]);
        
        if ($stmt->rowCount() > 0) {
            sendJsonResponse([
                'success' => true,
                'message' => 'Booking status updated successfully'
            ]);
        } else {
            sendJsonResponse(['success' => false, 'message' => 'Failed to update booking status'], 500);
        }
        
    } catch (Exception $e) {
        error_log("Update booking status error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to update booking status'], 500);
    }
}
?>