require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');
console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => seed())   // run seed after connecting
    .catch(err => console.error(err));

async function seed() {
    try {
        await Event.deleteMany();
        await Event.insertMany([
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
        ]);
        console.log('Database seeded with sample events');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
}
