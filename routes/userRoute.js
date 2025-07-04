const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/events', auth,userCtrl.getEvents);
router.post('/register-event', auth, userCtrl.registerEvent);
router.get('/my-registrations', auth, userCtrl.getMyRegistrations);


module.exports = router;
