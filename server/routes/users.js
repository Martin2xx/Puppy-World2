import express from 'express';
import mysql from 'mysql2';

const router = express.Router();


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'your-password', 
  database: 'Puppy-World', 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to Puppy-World DB');
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).send({ message: 'Database error' });
      }

      if (results.length > 0) {
        res.status(200).send({ message: 'Login successful', user: results[0] });
      } else {
        res.status(401).send({ message: 'Invalid credentials' });
      }
    }
  );
});

export default router;
