import React, { useState, useEffect } from "react";
import axios from "../utils/axios";

const Scan = () => {
  const [scanning, setScanning] = useState(false);
  const [specs, setSpecs] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    setScanning(true);
    setError(null);

    try {
      // Fetch hardware specs from Electron helper
      const detectedSpecs = await window.ipcRenderer.invoke("get-specs"); // <-- preload.js must expose getSpecs
      setSpecs(detectedSpecs);

      // Send specs to backend for analysis
      const response = await axios.post("/scan/analyze", detectedSpecs);

      setResult({
        bottlenecks: response.data.bottlenecks,
        outdatedParts: response.data.outdatedParts,
        upgradeSuggestions: response.data.upgradeSuggestions
      });
    } catch (err) {
      console.error(err);
      setError("Scan failed. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Scan Your PC</h2>

      <button
        onClick={handleScan}
        className={`px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition-colors ${
          scanning ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={scanning}
      >
        {scanning ? "Scanning..." : "Start Scan"}
      </button>

      {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}

      {specs && (
        <div className="mt-10 w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Your Detected Specs</h3>
          <p>
            <span className="font-semibold">CPU:</span> {specs.cpu.model} ({specs.cpu.cores} cores)
          </p>
          <p><span className="font-semibold">GPU:</span> {specs.gpu}</p>
          <p><span className="font-semibold">RAM:</span> {specs.ram} GB</p>
          <p>
            <span className="font-semibold">Storage:</span> {specs.storage.size} GB {specs.storage.type}
          </p>
          <p><span className="font-semibold">OS:</span> {specs.os.distro} {specs.os.arch}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Scan Results</h3>
          <p><span className="font-semibold">Bottlenecks:</span> {result.bottlenecks.join(", ") || "None"}</p>
          <p><span className="font-semibold">Outdated Parts:</span> {result.outdatedParts.join(", ") || "None"}</p>
          <p><span className="font-semibold">Upgrade Suggestions:</span> {result.upgradeSuggestions.join(", ") || "None"}</p>
        </div>
      )}
    </div>
  );
};

export default Scan;
