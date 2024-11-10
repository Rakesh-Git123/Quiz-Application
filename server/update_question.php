<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


include 'db.php'; 


if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

$data = json_decode(file_get_contents("php://input"),true);


    $id=$data['question_id'];
    $question_text = $data['question_text'] ;
    $option_a = $data['option_a'];
    $option_b = $data['option_b'];
    $option_c = $data['option_c'];
    $option_d = $data['option_d'] ;
    $correct_answer = $data['correct_answer'];


$sql = "UPDATE questions SET 
            question_text = ?, 
            option_a = ?, 
            option_b = ?, 
            option_c = ?, 
            option_d = ?, 
            correct_answer = ?
        WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssi", $question_text, $option_a, $option_b, $option_c, $option_d, $correct_answer, $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Question updated successfully.']);
} else {
   
    echo json_encode(['status' => 'error', 'message' => 'Failed to update question.']);
}


$stmt->close();
$conn->close();
}
?>
