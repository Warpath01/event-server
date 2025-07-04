require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api', require('./routes/eventRoute'));

if (process.env.RUN_SEED === 'true') {
  require('./seed');
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
