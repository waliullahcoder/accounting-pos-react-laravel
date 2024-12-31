const express = require('express');
const authRoutes = require('./routes/authRoutes');

const cors = require('cors');
const app = express();



// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  next();
});

// Enable CORS for all origins (or specify your frontend's URL)
app.use(cors());

// Or, if you only want to allow specific origins (e.g., localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/auth', authRoutes);

module.exports = app;