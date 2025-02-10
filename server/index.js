import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import userRouts from './routes/users.js'; 
import questionRouts from './routes/questions.js';
import answersRouts from './routes/answers.js';

const app = express();

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2155631Mr!',
  database: 'puppyworld',
  connectionLimit: 10, 
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to Puppy World DB');
  connection.release(); 
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use('/users', userRouts);
app.use('/questions', questionRouts);
app.use('/answers', answersRouts);

app.get('/', (req, res) => {
  res.send("The main server is running");
});

app.listen(3002, () => {
  console.log("Server running on port 3002");
});
