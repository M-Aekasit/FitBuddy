const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Temporary in-memory user store
const users = [];

router.use(bodyParser.json());

// Signup endpoint
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingUser = users.find(user => user.username === username || user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Username or email already exists.' });
  }

  users.push({ username, email, password });
  res.status(201).json({ message: 'User registered successfully.' });
});

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  res.status(200).json({ message: 'Login successful.' });
});

module.exports = router;
