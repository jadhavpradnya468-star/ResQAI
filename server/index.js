const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/analyze',   require('./routes/analyze'));
app.use('/api/vets',      require('./routes/vets'));
app.use('/api/chatbot',   require('./routes/chatbot'));
app.use('/api/incidents', require('./routes/incidents'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 ResQAI server running on port ${PORT}`));