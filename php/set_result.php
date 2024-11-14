<?php
// Set headers
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Include database connection
include 'db.php'; 

// Decode the JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Assign variables from the JSON data
$user_name = $data['name'];
$user_email = $data['email'];
$user_image = $data['image'];
$score = $data['score'];

// Check if a record already exists for this user email
$sql_check = "SELECT * FROM quiz_results WHERE email = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $user_email);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

// If user already exists, update the score
if ($result_check->num_rows > 0) {
    $sql_update = "UPDATE quiz_results SET score = ? WHERE  name = ? AND email = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("iss", $score, $user_name, $user_email);

    if ($stmt_update->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Score updated successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update score.']);
    }
    $stmt_update->close();
} else {
    // If no existing record, insert a new one
    $sql_insert = "INSERT INTO quiz_results (name, email, image,score) VALUES (?, ?, ?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("sssi", $user_name, $user_email, $user_image,$score);

    if ($stmt_insert->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Result added successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add result.']);
    }
    $stmt_insert->close();
}

// Close the check statement and the connection
$stmt_check->close();
$conn->close();
?>
