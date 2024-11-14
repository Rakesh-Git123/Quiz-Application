<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    
    $data = json_decode(file_get_contents("php://input"), true);
    $question_id = $data['id']; 

    if ($question_id) {
        
        $stmt = $conn->prepare("DELETE FROM questions WHERE id = ?");
        $stmt->bind_param("i", $question_id);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Question deleted successfully.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Question not found.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting question.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Question ID is required.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}

$conn->close(); 
?>
