import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Questions({ user }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [answerBody, setAnswerBody] = useState("");

  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3002/questions/");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:3002/answers?question_id=${questionId}`);
      setAnswers((prev) => ({ ...prev, [questionId]: response.data }));
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };
  

  
  const handleSubmit = async (event, questionId) => {
    event.preventDefault();
    
    if (!answerBody.trim()) { // Prevent empty answers
      alert("Answer cannot be empty.");
      return;
    }
  
    try {
      await axios.post("http://localhost:3002/answers/", {
        question_id: questionId,
        user_id: user?.user_id, 
        answer_body: answerBody,
      });
      setAnswerBody(""); 
      fetchAnswers(questionId); 
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.question_id} style={{ backgroundColor: "#d8d6d6", padding: "20px", marginBottom: "10px" }}>
          <strong>Question:</strong> {question.title}

          
          <Button variant="link" onClick={() => fetchAnswers(question.question_id)}>
            Show Answers
          </Button>

          <div>
            <h4>Previous Answers</h4>
            {answers[question.question_id]?.length > 0 ? (
              answers[question.question_id].map((answer, index) => (
                <div key={index} style={{ backgroundColor: "#f9f9f9", padding: "10px", marginTop: "5px" }}>
                  {answer.answer_body}
                </div>
              ))
            ) : (
              <p>No answers yet.</p>
            )}
          </div>

          
          <div style={{ backgroundColor: "#ffffff", padding: "20px", marginTop: "10px" }}>
            <h4>Leave a Reply</h4>
            <Form.Control
              type="text"
              placeholder="Your Answer"
              value={answerBody}
              onChange={(e) => setAnswerBody(e.target.value)}
            />
            <Button variant="warning" onClick={(event) => handleSubmit(event, question.question_id)}>
              Submit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
