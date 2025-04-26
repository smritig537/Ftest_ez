const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

// API Route
app.post('/api/send-requirement', (req, res) => {
  const { name, phone, service, message } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log(' Received requirement:', { name, phone, service, message });

  return res.status(200).json({ message: 'Requirement received successfully' });
});

// Server
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
