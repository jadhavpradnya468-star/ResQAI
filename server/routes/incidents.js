const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// Save new incident
router.post('/', async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json({ message: 'Incident saved', incident });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save' });
  }
});

// Get all incidents
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

module.exports = router;