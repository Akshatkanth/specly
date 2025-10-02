const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");


const Scan = require("../models/Scan");


router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { specs, bottlenecks, upgradeSuggestions } = req.body;

    const newScan = new Scan({
      userId: req.user.id,
      specs,
      bottlenecks,
      upgradeSuggestions,
      createdAt: new Date()
    });

    await newScan.save();
    res.json({ message: "Scan saved successfully", scan: newScan });
  } catch (err) {
    res.status(500).json({ message: "Error saving scan", error: err.message });
  }
});

// Get scan history (protected)
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching scans", error: err.message });
  }
});

module.exports = router;
