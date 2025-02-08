import express from 'express';
import db from '../dbconnection.js';

const router = express.Router();


router.get("/fetch", (req, res) => {
  const { question_id } = req.query;

  if (!question_id) {
    return res.status(400).json({ error: "Missing required question_id" });
  }

  const query = "SELECT * FROM Answers WHERE question_id = ?";
  db.query(query, [question_id], (err, result) => {
    if (err) {
      console.error("Error fetching answers:", err);
      return res.status(500).send("Error fetching answers");
    }
    res.json(result);
  });
});

router.post("/add", (req, res) => {
  console.log("Received request body:", req.body); 
  const { question_id, user_id, answer_body } = req.body;

  if (!question_id || !user_id || !answer_body) {
    console.log("Missing required fields:", { question_id, user_id, answer_body }); 
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = "INSERT INTO Answers (question_id, user_id, answer_body) VALUES (?, ?, ?)";

  db.query(query, [question_id, user_id, answer_body], (err, result) => {
    if (err) {
      console.error("Error inserting answer:", err);
      return res.status(500).json({ error: "Error inserting answer" });
    }

    res.status(201).json({ success: true, answer_id: result.insertId });
  });
});

export default router;
