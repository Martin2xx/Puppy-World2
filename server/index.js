// server/index.js
import express from 'express';
import cors from 'cors';
import userRouts from './routes/users.js'; 
import questionRouts from './routes/questions.js';
import answersRouts from './routes/answers.js';

const app = express();


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
