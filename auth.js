const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const FIXED_USERNAME = 'admin';
const FIXED_PASSWORD = 'admin';

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    if (name === FIXED_USERNAME && password === FIXED_PASSWORD) {
      const token = jwt.sign(
        { username: name },
        process.env.JWT_SECRET, 
        { expiresIn: '24h' } 
      );
      return res.status(200).send({
        status: 'success',
        message: 'Login successful',
        token 
      });
    } else {
      return res.status(401).send({ status: 'error', message: 'Unauthorized User' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;

