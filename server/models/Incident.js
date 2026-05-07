const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  animalType: String,
  severity:   String,
  location: {
    lat: Number,
    lng: Number
  },
  status:    { type: String, default: 'Reported' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incident', IncidentSchema);