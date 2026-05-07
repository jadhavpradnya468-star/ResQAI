const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const response = await axios.get(url, {
      params: {
        location: `${lat},${lng}`,
        radius: 5000,
        keyword: 'veterinary',
        key: process.env.GOOGLE_API_KEY
      }
    });
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch vets' });
  }
});

module.exports = router;