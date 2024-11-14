<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
include 'db.php';

$sql = "SELECT * FROM quiz_results ORDER BY score DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $leaderboard = [];
    while ($row = $result->fetch_assoc()) {
        $leaderboard[] = $row;
    }
    echo json_encode($leaderboard);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No results found']);
}

$conn->close();
?>
