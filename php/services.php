<?php
require_once 'config.php';

header('Content-Type: application/json');

$action = $_GET['action'] ?? 'get_services';

switch ($action) {
    case 'get_services':
        getServices();
        break;
    case 'get_service':
        getService();
        break;
    case 'search_services':
        searchServices();
        break;
    default:
        sendJsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
}

function getServices() {
    try {
        $pdo = getDBConnection();
        
        $city = $_GET['city'] ?? '';
        $type = $_GET['type'] ?? '';
        $limit = (int)($_GET['limit'] ?? 50);
        $offset = (int)($_GET['offset'] ?? 0);
        
        $sql = "SELECT * FROM services WHERE 1=1";
        $params = [];
        
        if ($city) {
            $sql .= " AND city = ?";
            $params[] = $city;
        }
        
        if ($type) {
            $sql .= " AND type = ?";
            $params[] = $type;
        }
        
        $sql .= " ORDER BY rating DESC, created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $services = $stmt->fetchAll();
        
        // Parse JSON amenities
        foreach ($services as &$service) {
            if ($service['amenities']) {
                $service['amenities'] = json_decode($service['amenities'], true);
            }
        }
        
        sendJsonResponse([
            'success' => true,
            'services' => $services
        ]);
        
    } catch (Exception $e) {
        error_log("Get services error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load services'], 500);
    }
}

function getService() {
    if (!isset($_GET['id'])) {
        sendJsonResponse(['success' => false, 'message' => 'Service ID is required'], 400);
    }
    
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $service = $stmt->fetch();
        
        if (!$service) {
            sendJsonResponse(['success' => false, 'message' => 'Service not found'], 404);
        }
        
        // Parse JSON amenities
        if ($service['amenities']) {
            $service['amenities'] = json_decode($service['amenities'], true);
        }
        
        sendJsonResponse([
            'success' => true,
            'service' => $service
        ]);
        
    } catch (Exception $e) {
        error_log("Get service error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Failed to load service'], 500);
    }
}

function searchServices() {
    $query = $_GET['q'] ?? '';
    $city = $_GET['city'] ?? '';
    $type = $_GET['type'] ?? '';
    $minPrice = (float)($_GET['min_price'] ?? 0);
    $maxPrice = (float)($_GET['max_price'] ?? 999999);
    $minRating = (float)($_GET['min_rating'] ?? 0);
    
    try {
        $pdo = getDBConnection();
        
        $sql = "SELECT * FROM services WHERE 1=1";
        $params = [];
        
        if ($query) {
            $sql .= " AND (title LIKE ? OR description LIKE ? OR location LIKE ?)";
            $searchTerm = "%{$query}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        if ($city) {
            $sql .= " AND city = ?";
            $params[] = $city;
        }
        
        if ($type) {
            $sql .= " AND type = ?";
            $params[] = $type;
        }
        
        if ($minRating > 0) {
            $sql .= " AND rating >= ?";
            $params[] = $minRating;
        }
        
        // Price filtering (check all price fields)
        if ($maxPrice < 999999) {
            $sql .= " AND (
                (price_per_night IS NOT NULL AND price_per_night BETWEEN ? AND ?) OR
                (price_per_day IS NOT NULL AND price_per_day BETWEEN ? AND ?) OR
                (price_per_hour IS NOT NULL AND price_per_hour BETWEEN ? AND ?) OR
                (price IS NOT NULL AND price BETWEEN ? AND ?)
            )";
            $params = array_merge($params, [$minPrice, $maxPrice, $minPrice, $maxPrice, $minPrice, $maxPrice, $minPrice, $maxPrice]);
        }
        
        $sql .= " ORDER BY rating DESC, created_at DESC LIMIT 50";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $services = $stmt->fetchAll();
        
        // Parse JSON amenities
        foreach ($services as &$service) {
            if ($service['amenities']) {
                $service['amenities'] = json_decode($service['amenities'], true);
            }
        }
        
        sendJsonResponse([
            'success' => true,
            'services' => $services,
            'count' => count($services)
        ]);
        
    } catch (Exception $e) {
        error_log("Search services error: " . $e->getMessage());
        sendJsonResponse(['success' => false, 'message' => 'Search failed'], 500);
    }
}
?>
