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
// Send to doctor
router.post('/send-to-doctor', async (req, res) => {
  try {
    const { animalType, severity, location } = req.body;
    
    const incident = new Incident({
      animalType,
      severity,
      location,
      status: 'Sent to Doctor',
      createdAt: new Date()
    });
    
    await incident.save();
    
    res.json({
      success: true,
      message: 'Report sent successfully!',
      reportId: incident._id,
      timestamp: incident.createdAt,
    });
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to send report' });
  }
});
module.exports = router;