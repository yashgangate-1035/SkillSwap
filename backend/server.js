const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'SkillSwap backend is running',
  });
});

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'SkillSwap API is working!' });
});

const ensureDatabaseConnection = async (req, res, next) => {
  try {
    await connectDB();
    return next();
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    return res.status(503).json({ message: 'Database connection unavailable' });
  }
};

// User routes
app.use('/api/users', ensureDatabaseConnection, userRoutes);

// Skill routes
app.use('/api/skills', ensureDatabaseConnection, skillRoutes);

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
