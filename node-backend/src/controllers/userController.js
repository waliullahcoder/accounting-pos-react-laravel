const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const config = require('../config');
exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    ;
    res.status(200).json(await userService.login({ email, password }));
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


exports.getUserList = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
      return res.status(401).json({ error: "Sorry, Unauthenticated" });
    }

    // Verify token
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      // If token is valid, fetch the users
      const users = await userService.getUserList();
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

