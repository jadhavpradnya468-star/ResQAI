const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const form = new FormData();
    form.append('image', req.file.buffer, req.file.originalname);

    const response = await axios.post(
      `${process.env.FLASK_URL}/predict`,
      form,
      { headers: form.getHeaders() }
    );

    res.json(response.data); // { animal: "dog", severity: "Moderate" }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'AI service unavailable' });
  }
});

module.exports = router;