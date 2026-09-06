const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());

app.use(cors({
  origin: "https://myapp.com",
  credentials: true
}));



//mysql connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: process.env.AIVEN_CA_CERT
  }
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the Aiven MySQL database.');

  connection.release();
});

//view all students in the database
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching students');
            return;
        }
        res.json(results);
    });
});


//insert a new student into the database
app.post('/insert_students', (req, res) => {
    const { fullName, email, phone, gender, dateOfBirth } = req.body;
    const sql = 'INSERT INTO students (fullName, email, phone, gender, dateOfBirth) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fullName, email, phone, gender, dateOfBirth], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error adding student');
            return;
        }
        res.status(201).send('Student added successfully');
    });
}); 

//update a student in the database
app.put('/update_students/:id', (req, res) => {
    const studentId = req.params.id;
    const { fullName, email, phone, gender, dateOfBirth } = req.body;
    const sql = 'UPDATE students SET fullName = ?, email = ?, phone = ?, gender = ?, dateOfBirth = ? WHERE id = ?';
    db.query(sql, [fullName, email, phone, gender, dateOfBirth, studentId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error updating student');
            return;
        }
        res.send('Student updated successfully');
    });
});

//delete a student from the database
app.delete('/delete_students/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [studentId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error deleting student');
            return;
        }
        res.send('Student deleted successfully');
    });
});     

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
}); 
