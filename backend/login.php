<?php
session_start();
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data && isset($data['email']) && isset($data['password'])) {
        $email = $data['email'];
        $password = $data['password'];

        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            echo json_encode(['success'=>true,'message' => 'Login successful','username'=>$user['email']]);
        } else {
            echo json_encode(['success'=>false,'message' => 'Invalid credentials']);
        }
    } else {
        echo json_encode(['message' => 'Username and password are required']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}
?>
