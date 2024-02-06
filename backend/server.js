const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3001;
app.use(cors());

const connection = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6682196',
  password: 'BsNhQu8qsK',
  database: 'sql6682196',
});

connection.connect();

app.use(bodyParser.json());

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  connection.query(query, [name, email, password], (err, result) => {
    if (err) throw err;
    res.status(201).send('User registered successfully');
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, result) => {
    if (err) {
      res.status(401).send('Invalid credentials');
    } else if (result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

app.get('/getUserDetails/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(401).send('User Not Found');
    } else if (result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(401).send('User Not Found');
    }
  });
});

app.put('/editUserDetails', (req, res) => {
  const { id, name, email, age, dob, contact } = req.body;
  const query =
  'UPDATE users SET name = ?, email = ?, age = ?, dob = ?, contact = ? WHERE id = ?';
  connection.query(query, [name, email, age, dob, contact, id], (err, result) => {
    if (err){
      res.status(401).send('Something went wrong');
    }
    res.status(201).send('User Details Updated successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
