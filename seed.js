const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const events = [
    {
        title: 'Tech Conference 2025',
        description: 'A conference about the latest in technology.',
        date: new Date('2025-09-10'),
        location: 'San Francisco, CA'
    },
    {
        title: 'Startup Pitch Night',
        description: 'Pitch your startup idea to investors.',
        date: new Date('2025-08-05'),
        location: 'New York, NY'
    },
    {
        title: 'Web Development Bootcamp',
        description: 'Learn full stack web development in one week.',
        date: new Date('2025-07-20'),
        location: 'Los Angeles, CA'
    },
    {
        title: 'AI & Machine Learning Workshop',
        description: 'Explore the world of AI with hands-on workshops.',
        date: new Date('2025-10-15'),
        location: 'Boston, MA'
    },
    {
        title: 'Design Thinking Summit',
        description: 'A summit to rethink and innovate product design.',
        date: new Date('2025-11-03'),
        location: 'Seattle, WA'
    },
    {
        title: 'Cloud Computing Meetup',
        description: 'Discuss trends and tools in cloud computing.',
        date: new Date('2025-12-12'),
        location: 'Chicago, IL'
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await Event.deleteMany();  // Clear existing events
        console.log('Old events removed');

        await Event.insertMany(events);
        console.log('6 sample events inserted');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
