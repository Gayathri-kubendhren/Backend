const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const adminEmail = 'admin@example.com';
const adminPassword = 'admin123';
const secretKey = 'your_admin_jwt_secret'; // should match with your frontend token usage

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
