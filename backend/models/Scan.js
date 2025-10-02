const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specs: {
    cpu: String,
    gpu: String,
    ram: String,
    storage: String,
  },
  bottlenecks: [String],
  upgradeSuggestions: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Scan", scanSchema);
