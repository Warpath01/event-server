require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Seed admin user
    await User.deleteOne({ email: 'admin@example.com' });
    const passwordHash = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: passwordHash,
      role: 'admin'
    });
    console.log('✅ Admin user created: admin@example.com / admin123');

    // Seed events
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
    console.log('✅ Events seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
