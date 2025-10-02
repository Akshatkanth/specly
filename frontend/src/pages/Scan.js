import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { getSuggestions } from "../utils/suggestions";
import { FaMicrochip, FaMemory, FaHdd, FaDesktop, FaWindows } from "react-icons/fa";

const Scan = () => {
  const [scanning, setScanning] = useState(false);
  const [specs, setSpecs] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

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

  useEffect(() => {
    if (specs) {
      setSuggestions(getSuggestions(specs));
    }
  }, [specs]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-3xl font-extrabold text-cyan-400 mb-6 text-center">Your PC Scan Results</h2>
      <hr className="border-cyan-400 mb-8" />

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* CPU Card */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-cyan-400/30">
            <div className="flex items-center mb-2">
              <FaMicrochip className="text-cyan-400 mr-2" />
              <h4 className="text-lg font-bold text-cyan-400">CPU</h4>
            </div>
            <p className="text-white">Model: <span className="text-gray-300">{specs.cpu.model}</span></p>
            <p className="text-white">Cores: <span className="text-gray-300">{specs.cpu.cores}</span></p>
            <p className="text-white">Threads: <span className="text-gray-300">{specs.cpu.threads}</span></p>
            <p className="text-white">Speed: <span className="text-gray-300">{specs.cpu.speed} GHz</span></p>
          </div>
          {/* GPU Card */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-cyan-400/30">
            <div className="flex items-center mb-2">
              <FaDesktop className="text-cyan-400 mr-2" />
              <h4 className="text-lg font-bold text-cyan-400">GPU</h4>
            </div>
            <p className="text-white">Model: <span className="text-gray-300">{specs.gpu}</span></p>
          </div>
          {/* RAM Card */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-cyan-400/30">
            <div className="flex items-center mb-2">
              <FaMemory className="text-cyan-400 mr-2" />
              <h4 className="text-lg font-bold text-cyan-400">RAM</h4>
            </div>
            <p className="text-white">Total: <span className="text-gray-300">{specs.ram} GB</span></p>
          </div>
          {/* Storage Card */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-cyan-400/30">
            <div className="flex items-center mb-2">
              <FaHdd className="text-cyan-400 mr-2" />
              <h4 className="text-lg font-bold text-cyan-400">Storage</h4>
            </div>
            <p className="text-white">Size: <span className="text-gray-300">{specs.storage.size} GB</span></p>
            <p className="text-white">Type: <span className="text-gray-300">{specs.storage.type}</span></p>
          </div>
          {/* OS Card */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-cyan-400/30">
            <div className="flex items-center mb-2">
              <FaWindows className="text-cyan-400 mr-2" />
              <h4 className="text-lg font-bold text-cyan-400">Operating System</h4>
            </div>
            <p className="text-white">Distro: <span className="text-gray-300">{specs.os.distro}</span></p>
            <p className="text-white">Arch: <span className="text-gray-300">{specs.os.arch}</span></p>
          </div>
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

      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {suggestions.map((s, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">{s.part} Suggestion</h4>
                <p className="text-white mb-2">{s.problem}</p>
              </div>
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-cyan-300 transition-colors text-center"
              >
                {s.label}
              </a>
            </div>
          ))}
        </div>
      )}

      <a
        href="/shop"
        className="block mt-10 mx-auto bg-cyan-400 text-gray-900 font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-cyan-300 transition-colors text-lg text-center w-fit"
      >
        Shop PC Parts
      </a>
    </div>
  );
};

export default Scan;
