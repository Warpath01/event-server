const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Event deleted by admin' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find().populate('user').populate('event');
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteRegistration = async (req, res) => {
    try {
        await Registration.findByIdAndDelete(req.params.id);
        console.log(req.params.id)
        res.json({ msg: 'Registration deleted by admin' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getEventAttendees = async (req, res) => {
    try {
        const registrations = await Registration.find({ event: req.params.id }).populate('user', 'name');

        const attendees = registrations.map(r => ({
            _id: r.user._id,
            name: r.user.name
        }));
        res.json(attendees);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


