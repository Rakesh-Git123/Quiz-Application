<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if (isset($_SESSION['user_id'])) {
    
    echo json_encode(['authenticated' => true, 'email' => $_SESSION['email']]);
} else {
    
    echo json_encode(['authenticated' => false]);
}
