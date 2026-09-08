const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'SkillSwap API is working!' });
});

// User routes
app.use('/api/users', userRoutes);

// Skill routes
app.use('/api/skills', skillRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
