const express = require("express");
const router = express.Router();

const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

// Store image in memory
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

// ======================================================
// POST /api/analyze
// ======================================================

router.post("/", upload.single("image"), async (req, res) => {

  try {

    // Check image
    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded"
      });
    }

    // Create form-data for Flask API
    const formData = new FormData();

    formData.append(
      "image",
      req.file.buffer,
      req.file.originalname
    );

    // ==================================================
    // FLASK AI SERVICE LINK
    // ==================================================

    const flaskResponse = await axios.post(
      "http://localhost:5001/predict",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    // ==================================================
    // Return AI response
    // ==================================================

    return res.json({
      success: true,
      animal: flaskResponse.data.animal,
      severity: flaskResponse.data.severity
    });

  } catch (error) {

    console.log("Analyze Error:", error.message);

    return res.status(500).json({
      success: false,
      error: "AI Analysis Failed"
    });
  }

});

module.exports = router;