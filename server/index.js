
import express from 'express'
import cors from 'cors'
import userRouts from './routes/users.js'
// import questionsRouts from './Router/Questions.js'
// import answersRouts from './Router/Answers.js'

const app = express();
app.use(express.json()); 

// CORS configuration: Allow dynamic domain based on environment (dev vs prod)
app.use(cors({ origin: "http://localhost:3000" }));


// Set the router endpoint
app.use ('/users', userRouts)
// app.use ('/questions', questionsRouts)
// app.use ('/answers', answersRouts)

app.get ('/', (req,res)=> {
  res.send ("The main server Running")
})

app.listen (3002, ()=>{
  console.log ("Server runnnig on port 3002")
})