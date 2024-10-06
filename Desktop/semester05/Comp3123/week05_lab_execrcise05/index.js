const express = require('express');
const path = require('path'); // Importing path module
const fs = require('fs'); // Importing fs module to read files
const app = express();
const router = express.Router();

app.use(express.json()); // Middleware to parse JSON body

// Serve home.html file for the home route
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html')); // Updated to send the HTML file
});

// Return all details from user.json file to client as JSON format
router.get('/profile', (req, res) => {
  fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading user data');
    }
    res.json(JSON.parse(data)); // Parse JSON data and send it
  });
});

// Modify /login router to accept username and password as JSON body parameter
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading user data');
    }

    const user = JSON.parse(data);
    // Validate username and password
    if (username !== user.username) {
      return res.status(400).json({
        status: false,
        message: "User Name is invalid",
      });
    }
    if (password !== user.password) {
      return res.status(400).json({
        status: false,
        message: "Password is invalid",
      });
    }

    // If both username and password are valid
    res.json({
      status: true,
      message: "User Is valid",
    });
  });
});

// Modify /logout route to accept username as parameter and display message
router.get('/logout', (req, res) => {
  const username = req.query.username; // Getting username from query parameters
  res.send(`<b>${username} successfully logged out.</b>`); // Sending response in HTML format
});

// Add error handling middleware to handle below error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error'); // Updated to return 500 error with message
});

app.use('/', router);

app.listen(process.env.port || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.port || 8081));
});
