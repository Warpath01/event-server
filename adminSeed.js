require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    await User.deleteOne({ email: 'admin@example.com' }); // delete old one
    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: passwordHash,
        role: 'admin'
    });
    await admin.save();
    console.log('Admin user created: admin@example.com / admin123');
    process.exit();
});
