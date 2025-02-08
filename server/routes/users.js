
import express from 'express';
import db from '../dbconnection.js';

const router = express.Router();


router.post("/", (req, res) => {
  const { user_name, user_password } = req.body;
  if (!user_name || !user_password) {
    return res.status(400).send("Missing required fields");
  }

  const query = "INSERT INTO Users (user_name, user_password) VALUES (?, ?)";
  db.query(query, [user_name, user_password], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).send("Error inserting user");
    }
    const newUser = {
      user_id: result.insertId,
      user_name,
    };
    res.status(201).json(newUser);
  });
});


router.post("/login", (req, res) => {
  const { user_name, user_password } = req.body;
  if (!user_name || !user_password) {
    return res.status(400).send("Missing username or password.");
  }

  const query = "SELECT * FROM Users WHERE user_name = ? AND user_password = ?";
  db.query(query, [user_name, user_password], (err, result) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).send("Error logging in.");
    }

    if (result.length > 0) {
      return res.json(result);  
    } else {
      return res.status(401).send("Invalid credentials");
    }
  });
});

export default router;
