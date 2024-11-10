<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') { 
    $sql = "SELECT * FROM questions"; 
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    $rows = []; 
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row; 
    }

    
    echo json_encode($rows); 
} else {
    echo json_encode(['message' => 'Invalid request method']);
}
?>
