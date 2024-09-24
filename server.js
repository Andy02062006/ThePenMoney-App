const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // Change if your DB is hosted elsewhere
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password
    database: 'demodb' // Your MySQL database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Login route
app.post('/login', (req, res) => {
    const { aadhar, password } = req.body;

    // Simple validation (you may want to use a more secure method)
    const query = 'SELECT * FROM users WHERE aadhar = ? AND password = ?';
    db.query(query, [aadhar, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(200).json({ message: 'Logged in successfully!' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
});  
    });

    // const query = 'SELECT password FROM users WHERE aadhar = ?';
    // db.query(query, aadhar, (err, results) => {
    //     if(aadhar == aadhar && password == results) {
    //         return res.status(200).json({message : "logged in"});
    //     }
    //     else {
    //         return res.status(401).json({message : "no"});
    //     }
    // })
    // Registration route
    app.post('/registrationfinance', (req, res) => {
        const { name, place, qualification, contact, aadhar, shg, password } = req.body;
    
            // SQL query to insert a new user
            const query = 'INSERT INTO usersfinances (name, place, qualification, contact, aadhar, shg, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
            // Execute the query
            db.query(query, [name, place, qualification, contact, aadhar, shg, password], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error: ' + err });
                }
    
                return res.status(201).json({ message: 'Registration successful!', userId: results.insertId });
            });
        });

    // Start the server
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });