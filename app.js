require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS properly
app.use(cors({
  origin: process.env.CLIENT_URL || '*',  // replace * with your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // only if you use cookies/auth headers
}));

// Body parser
app.use(express.json());

// Routes
app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api', require('./routes/eventRoute'));

// Optional seeder
if (process.env.RUN_SEED === 'true') {
  require('./seed');
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
