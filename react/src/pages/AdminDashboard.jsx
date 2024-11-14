import React, { useState, useEffect, useContext } from 'react';
import "./AdminDashboard.css"
import { DataContext } from '../context/DataContext';
const AdminDashboard = () => {
  const { checkAuth, isAuthenticated,currentUser,userdetails } = useContext(DataContext);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [questionData, setQuestionData] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
  });
  const [updateQuestionData, setUpdateQuestionData] = useState({
    question_id:'',
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
  });

  useEffect(() => {
    checkAuth()
    fetchQuestions();
  }, []);

  useEffect(()=>{
    if(isAuthenticated)
    currentUser()
  },[isAuthenticated])

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const updateHandleChange=(e)=>{
    const { name, value } = e.target;
    setUpdateQuestionData({ ...updateQuestionData, [name]: value });
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/grocery_website/server/add_question.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(questionData),
      });

      const data = await response.json();
      if (data.status === 'success') {
        alert(data.message);
        setQuestionData({
          question_text: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          correct_answer: '',
        });
        fetchQuestions()
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(' Unable to add question.');
      console.error('Error:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost/grocery_website/server/get_questions.php', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setQuestions(data); // Set the fetched data to state
    } catch (error) {
      setError('Error fetching questions: ' + error.message);
    }
  };

  const deleteQuestion = async (id) => {

    try {
      const response = await fetch(`http://localhost/grocery_website/server/delete_question.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }), // Send the question ID in the request body
      });
  
      const data = await response.json();
      if (data.success) {
        alert(data.message); // Display success message
        fetchQuestions(); // Refresh the questions list after deletion
      } else {
        alert(data.message); // Display error message
      }
    } catch (error) {
      alert('Error deleting question: ' + error.message);
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost/grocery_website/server/update_question.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateQuestionData),
      });

      const data = await response.json();
      if (data.status === 'success') {
        alert(data.message);
        setUpdateQuestionData({
          question_id:'',
          question_text: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          correct_answer: '',
        });
        fetchQuestions();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Unable to update question.');
      console.error('Error:', error);
    }
  };


  return (
    <div className='AdminDashboard'>
      {
        isAuthenticated && userdetails.role==="admin\r\n"?
        <>
         <h3 style={{textAlign:"center"}}>Questions List</h3>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.length > 0 ? (
            questions.map((question) => (
              <tr key={question.id}>
                <td>{question.id}</td>
                <td>{question.question_text}</td>
                <td>{question.correct_answer}</td>
                <td><i class="fa-solid fa-pen-to-square" data-toggle="modal" data-target="#updateModal" onClick={()=>{setUpdateQuestionData({ ...updateQuestionData, question_id:question.id })}}></i> <i class="fa-solid fa-trash" onClick={()=>deleteQuestion(question.id)}></i></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No questions available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="button1">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add Question
      </button>
      </div>


      {/* Add questions modal */}
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Question</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Question:</label>
                  <input
                    type="text"
                    name="question_text"
                    value={questionData.question_text}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Option A:</label>
                  <input
                    type="text"
                    name="option_a"
                    value={questionData.option_a}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Option B:</label>
                  <input
                    type="text"
                    name="option_b"
                    value={questionData.option_b}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Option C:</label>
                  <input
                    type="text"
                    name="option_c"
                    value={questionData.option_c}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Option D:</label>
                  <input
                    type="text"
                    name="option_d"
                    value={questionData.option_d}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Correct Answer (Letter Only):</label>
                  <input
                    type="text"
                    name="correct_answer"
                    value={questionData.correct_answer}
                    onChange={handleChange}
                    required
                    maxLength="1"
                  />
                </div>
                <button type="submit">Add Question</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Update question modal */}
      <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Update question</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleUpdate}>
                <div>
                  <label>Question:</label>
                  <input
                    type="text"
                    name="question_text"
                    value={updateQuestionData.question_text}
                    onChange={updateHandleChange}
                    required
                  />
                </div>
                <div>
                  <label>Option A:</label>
                  <input
                    type="text"
                    name="option_a"
                    value={updateQuestionData.option_a}
                    onChange={updateHandleChange}
                    required
                  />
                </div>
                <div>
                  <label>Option B:</label>
                  <input
                    type="text"
                    name="option_b"
                    value={updateQuestionData.option_b}
                    onChange={updateHandleChange}
                    required
                  />
                </div>
                <div>
                  <label>Option C:</label>
                  <input
                    type="text"
                    name="option_c"
                    value={updateQuestionData.option_c}
                    onChange={updateHandleChange}
                    required
                  />
                </div>
                <div>
                  <label>Option D:</label>
                  <input
                    type="text"
                    name="option_d"
                    value={updateQuestionData.option_d}
                    onChange={updateHandleChange}
                    required
                  />
                </div>
                <div>
                  <label>Correct Answer (Letter Only):</label>
                  <input
                    type="text"
                    name="correct_answer"
                    value={updateQuestionData.correct_answer}
                    onChange={updateHandleChange}
                    required
                    maxLength="1"
                  />
                </div>
                <button type="submit">Update Question</button>
              </form>
            </div>
          </div>
        </div>
      </div>
        </>:
        <>You are not authorised</>
      }
    </div>


  );
};

export default AdminDashboard;
