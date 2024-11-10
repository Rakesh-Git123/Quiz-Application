<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$data = json_decode(file_get_contents("php://input"), true);
$name=$data['name'];
$image=$data['image'];
$email=$data['email'];
$message=$data['message'];

$sql = "INSERT INTO contact (name,image,email,message) VALUES (?,?, ?, ?)";
$stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss",$name,$image,$email,$message);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success','message'=>'Message sent successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Cannot sent the message']);
    }

    $stmt->close();
    $conn->close();
}
else {
    
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
}

?>