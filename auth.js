const express = require('express');
const router = express.Router();


const FIXED_USERNAME = 'admin';
const FIXED_PASSWORD = 'admin';

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    if (name === FIXED_USERNAME && password === FIXED_PASSWORD) {
      res.status(200).send({ status: 'success', message: 'Login successful' });
    } else {
      res.status(401).send({ status: 'error', message: 'Unauthorized User' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
