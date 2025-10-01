const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const scanRoutes = require('./routes/scan');
const compatibilityRoutes = require('./routes/compatibility');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/pcChecker')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use('/api/scan', scanRoutes);
app.use('/api/compatibility', compatibilityRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
