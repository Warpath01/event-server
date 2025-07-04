const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    location: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendeesCount: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Event', eventSchema);

