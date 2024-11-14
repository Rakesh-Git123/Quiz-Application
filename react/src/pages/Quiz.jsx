import React, { useState, useEffect, useContext } from 'react';
import "./Quiz.css";
import { DataContext } from '../context/DataContext';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const { checkAuth, isAuthenticated,currentUser,userdetails } = useContext(DataContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost/grocery_website/php/get_questions.php');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    checkAuth();
    fetchQuestions();
  }, []);

  useEffect(()=>{
    if(isAuthenticated)
    currentUser()
  },[isAuthenticated])
  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption.toUpperCase(),
    });
  };

  const checkScore = () => {
    let newScore = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      const correctAnswer = question.correct_answer.toUpperCase();
      if (userAnswer === correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    return newScore;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const finalScore = checkScore(); 

    try{
        let res=await fetch("http://localhost/grocery_website/php/set_result.php",{
        method:'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({email:userdetails.email,name:userdetails.name,image:userdetails.image,score:finalScore})
    })
    let data=await res.json()
    alert(data.message)
    }
    catch(err){
        alert("There was an error")
        console.log(err);
    }
    

  };

  return (
    <div className='Quiz'>
      {isAuthenticated && userdetails.role==="user" ? (
        <>
          <form className='questions' onSubmit={handleSubmit}>
          <h2>Multiple Choice!</h2>
          <p>All questions are mandatory</p>
            {questions.map((question,index) => (
              <div key={question.id}>
                <p className='mt-3'>{index+1+". "+question.question_text}</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {['a', 'b', 'c', 'd'].map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.toUpperCase()}
                        onChange={() => handleOptionChange(question.id, option)}
                        checked={answers[question.id] === option.toUpperCase()}
                        required
                      />
                      {question[`option_${option}`]}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit">Submit Answers</button>
            <div style={{textAlign:"center",marginTop:"20px"}}>Your Score: {score}</div>
          </form>
        </>
      ) : (
        <>You are not authorized to take the quiz.</>
      )}
    </div>
  );
};

export default Quiz;
