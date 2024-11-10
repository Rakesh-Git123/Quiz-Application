<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $email = $data['id'];

    $sql = "DELETE FROM contact WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Message deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete message']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Id is required.']);
}
$conn->close();
?>
