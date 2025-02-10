import express from "express";
import db from "../dbconnection.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT * FROM Questions";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching questions:", err);
      return res.status(500).json({ error: "Error fetching questions" });
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  console.log("Received request body:", req.body);
  const { title, body, user_id } = req.body;

  if (!title || !body || !user_id) {
    console.log("Missing required fields:", { title, body, user_id });
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = "INSERT INTO Questions (title, body, user_id) VALUES (?, ?, ?)";

  db.query(query, [title, body, user_id], (err, result) => {
    if (err) {
      console.error("Error inserting question:", err);
      return res.status(500).json({ error: "Error inserting question" });
    }

    const newQuestion = {
      question_id: result.insertId,
      title,
      body,
      user_id,
    };
    res.status(201).json(newQuestion);
  });
});

export default router;
