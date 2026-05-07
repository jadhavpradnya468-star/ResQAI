const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Mock response - Flask ready hone tak
    res.json({ 
      animal: "Dog", 
      severity: "Moderate"
    });
  } catch (err) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

module.exports = router;
