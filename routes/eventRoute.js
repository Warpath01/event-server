const express = require("express");
const router = express.Router();
const { addEvent } = require("../controllers/eventController");

// Optionally import auth middleware if you protect admin routes
const { auth, admin } = require('../middleware/authMiddleware');

// POST /admin/events → add event (admin only)
router.post("/events", auth, admin, addEvent);

module.exports = router;
