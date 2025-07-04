require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware FIRST!
app.use(cors({
  origin: 'https://eventapp-rho.vercel.app', // replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON
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
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
