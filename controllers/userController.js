const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const transporter = require('../config/nodemailer');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists (optional but recommended)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already in use' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        let user = new User({
            name,
            email,
            password: passwordHash
        });

        await user.save();

        res.json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', email, password);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ msg: 'User not found' });
        }
        console.log('User found, hashed password:', user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

exports.registerEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const registration = new Registration({ event: eventId, user: req.user.id });
        await registration.save();

        await Event.findByIdAndUpdate(
            eventId,
            { $inc: { attendeesCount: 1 } }
        );

        const event = await Event.findById(eventId);
        const user = await User.findById(req.user.id);


        // send email confirmation
        // await transporter.sendMail({
        //     to: user.email,
        //     subject: `Registered for ${event.title}`,
        //     text: `Hello ${user.name},\n\nYou have successfully registered for ${event.title}.`
        // });

        res.json({ msg: 'Registered successfully & email sent' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}


exports.getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user.id }).select('event');
        // returns list of objects with event field

        const eventIds = registrations.map(r => r.event.toString());
        res.json(eventIds);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};