<?php
// Include the database connection file
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $question_text = $data['question_text'] ;
    $option_a = $data['option_a'];
    $option_b = $data['option_b'];
    $option_c = $data['option_c'];
    $option_d = $data['option_d'] ;
    $correct_answer = $data['correct_answer'];

    $sql = "INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss",$question_text,$option_a,$option_b,$option_c,$option_d,$correct_answer );
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success','message'=>'Questions added successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Cannot add questions']);
    }
}

     else {
    
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
}
?>
