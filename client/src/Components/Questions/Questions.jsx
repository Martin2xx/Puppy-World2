import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../Styles/styles.css"



export default function Questions({ user }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionBody, setNewQuestionBody] = useState("");
  const [answerBodies, setAnswerBodies] = useState({});

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
      const response = await axios.get(
        `http://localhost:3002/answers/fetch?question_id=${questionId}`
      );
      setAnswers((prev) => ({ ...prev, [questionId]: response.data }));
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  const handleSubmitQuestion = async (event) => {
    event.preventDefault();
  
    if (!newQuestionTitle.trim() || !newQuestionBody.trim()) {
      alert("Both title and body are required.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3002/questions", {
        title: newQuestionTitle,
        body: newQuestionBody,
        user_id: user?.user_id, 
      });
  
      setNewQuestionTitle("");
      setNewQuestionBody("");
  
      setQuestions((prevQuestions) => [response.data, ...prevQuestions]);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };
  
  const handleSubmitAnswer = async (event, questionId) => {
    event.preventDefault();
  
    const answerBody = answerBodies[questionId];
  
    if (!answerBody.trim()) {
      alert("Answer cannot be empty.");
      return;
    }
  
    try {
      await axios.post("http://localhost:3002/answers/add", {
        question_id: questionId,
        user_id: user?.user_id,
        answer_body: answerBody,
      });
  
      setAnswerBodies((prev) => ({
        ...prev,
        [questionId]: "",
      }));
  
     
      fetchAnswers(questionId);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };
  

  return (
    <div>
      <div className="ask-question-container">
        <h4>Ask a Question</h4>
        <Form onSubmit={handleSubmitQuestion}>
          <Form.Group controlId="formQuestionTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter question title"
              value={newQuestionTitle}
              onChange={(e) => setNewQuestionTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formQuestionBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter question body"
              value={newQuestionBody}
              onChange={(e) => setNewQuestionBody(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Question
          </Button>
        </Form>
      </div>

      {questions.map((question) => (
        <div key={question.question_id} className="question-container">
          <strong>Question:</strong> {question.title}
          <Button variant="link" onClick={() => fetchAnswers(question.question_id)}>Show Answers</Button>
          <div>
            <h4>Previous Answers</h4>
            {Array.isArray(answers[question.question_id]) && answers[question.question_id].length > 0 ? (
              answers[question.question_id].map((answer, index) => (
                <div key={index} className="answer-container">
                  {answer.answer_body}
                </div>
              ))
            ) : (
              <p>No answers yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
