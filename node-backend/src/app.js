const express = require('express');
const authRoutes = require('./routes/authRoutes');
const Routes = require('./routes/Routes');

const cors = require('cors');
const app = express();

const path = require('path');

app.use('/uploads/products', express.static(path.join(__dirname, 'uploads/products')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api', Routes);

module.exports = app;