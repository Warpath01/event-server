require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware FIRST!
app.use(cors({
  origin: process.env.CLIENT_URL, // use env variable
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.send("This Server is Ready!");
});

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
