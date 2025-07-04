const Event = require("../models/Event");

// @desc    Add new event
// @route   POST /admin/events
// @access  Admin only
exports.addEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            createdBy: req.user.id // assuming you use auth middleware and req.user exists
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add event" });
    }
};
