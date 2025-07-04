const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { auth, admin } = require('../middleware/authMiddleware');

// Only accessible to logged in admins
router.get('/users', auth, admin, adminCtrl.getAllUsers);
router.delete('/users/:id', auth, admin, adminCtrl.deleteUser);

router.get('/events', auth, admin, adminCtrl.getAllEvents);
router.delete('/events/:id', auth, admin, adminCtrl.deleteEvent);

router.get('/registrations', auth, admin, adminCtrl.getAllRegistrations);
router.delete('/registrations/:id', auth, admin, adminCtrl.deleteRegistration);

router.get('/events/:id/attendees', auth, admin, adminCtrl.getEventAttendees);


module.exports = router;
