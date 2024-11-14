<?php
include 'db.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email=$_POST['email'];
    $password = $_POST['password'];
    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Check if the username already exists
    $checkUserQuery = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($checkUserQuery);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Username already exists']);
        $stmt->close();
        $conn->close();
        exit;
    }
   
        $image = $_FILES['image'];
        $image_name = $image['name'];
        $image_tmp = $image['tmp_name'];
        $image_folder = "uploads/" . basename($image_name);

        // Move the uploaded file to the target directory
         move_uploaded_file($image_tmp, $image_folder);
            // Insert user data into the MySQL database
            $sql = "INSERT INTO users (name,email, password, image) VALUES (?, ?, ?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssss", $name,$email, $hashed_password, $image_name);

            if ($stmt->execute()) {
                echo json_encode(['status' => 'success','message'=>'user registered successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'User registration failed']);
            }
        } 
    
$conn->close();
?>