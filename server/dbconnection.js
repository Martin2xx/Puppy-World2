import mysql from 'mysql2'

const dataBase = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2155631Mr!',
  database: 'puppyworld',
  socketPath: '/tmp/mysql.sock', });



dataBase.connect ((err)=> {
  if (err) {
    console.log ("Error on DB connect:", err)
    return;
  }
  console.log ("Connected to Puppy-World DB")
})

export default dataBase;