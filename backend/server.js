require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const scanRoutes = require('./routes/scan');
const compatibilityRoutes = require('./routes/compatibility');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/pcChecker')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.use('/api/scan', scanRoutes);
app.use('/api/compatibility', compatibilityRoutes);

app.get("/api/test/protected", authMiddleware, (req, res) => {
  res.json({ message: "You have access to this protected route!", user: req.user });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
