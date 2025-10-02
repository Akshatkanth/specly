const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Scan = require("../models/Scan");

// ----------------------
// Unprotected Analyze Route
// ----------------------
router.post("/analyze", (req, res) => {
  try {
    const { cpu, gpu, ram, storage } = req.body;

    const bottlenecks = [];
    const outdatedParts = [];
    const upgradeSuggestions = [];

    // RAM check
    if (ram < 16) {
      bottlenecks.push("RAM");
      upgradeSuggestions.push("Upgrade RAM to at least 16GB");
    }

    // GPU check
    if (!gpu || gpu.toLowerCase().includes("integrated")) {
      bottlenecks.push("GPU");
      outdatedParts.push("GPU");
      upgradeSuggestions.push("Upgrade GPU to a dedicated card");
    }

    // CPU check
    if (cpu && cpu.cores < 4) {
      bottlenecks.push("CPU");
      upgradeSuggestions.push("Consider upgrading CPU to at least 4 cores");
    }

    // Storage check
    if (storage && storage.size < 256) {
      bottlenecks.push("Storage");
      upgradeSuggestions.push("Upgrade storage to at least 256GB SSD");
    }

    // Return both detected specs and analysis
    res.json({
      specs: { cpu, gpu, ram, storage },
      bottlenecks,
      outdatedParts,
      upgradeSuggestions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error analyzing hardware", error: err.message });
  }
});

// ----------------------
// Save Scan (Protected)
// ----------------------
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

// ----------------------
// Get Scan History (Protected)
// ----------------------
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching scans", error: err.message });
  }
});

module.exports = router;
