import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { getSuggestions } from "../utils/suggestions";
import { FaMicrochip, FaMemory, FaHdd, FaDesktop, FaWindows } from "react-icons/fa";
import bgStars from "./assets/bg.jpg"; 

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
      const detectedSpecs = await window.ipcRenderer.invoke("get-specs");
      setSpecs(detectedSpecs);
      localStorage.setItem("speclySpecs", JSON.stringify(detectedSpecs));
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
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden pt-24 px-4"
      style={{
        backgroundImage: `url(${bgStars})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000"
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.95) 80%, #2176FF 120%)",
          opacity: 0.85
        }}
      ></div>
      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center">
        <h2 className="text-3xl font-extrabold text-[#2176FF] mb-6 text-center">Your PC Scan Results</h2>
        <p className="text-gray-300 text-center max-w-2xl mb-8 text-xl leading-relaxed">
          <span className="font-semibold text-[#2176FF]">Overview:</span> This page scans your PC hardware and operating system, detects bottlenecks and outdated parts, and provides upgrade suggestions tailored to your setup. You can review your CPU, GPU, RAM, storage, and OS details, and get instant recommendations for improving your system's performance. Use the <span className="text-[#2176FF] font-semibold">Shop for PC Parts</span> button to find compatible upgrades easily!
        </p>

        <button
          onClick={handleScan}
          className={`px-10 py-5 rounded-lg font-bold text-white text-xl bg-black border-2 border-[#2176FF] shadow-lg transition-all ${
            scanning ? "bg-gray-800 cursor-not-allowed" : "hover:bg-[#181A1B] hover:border-[#2176FF]"
          } mb-8`}
          disabled={scanning}
        >
          {scanning ? "Scanning..." : "Start Scan"}
        </button>

        {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}

        {specs && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 w-full justify-items-center">
            {/* CPU Card */}
            <div className="bg-black bg-opacity-95 rounded-2xl shadow-2xl p-10 border border-[#2176FF]/60 flex flex-col items-center w-full
  transition-transform duration-200 hover:scale-105"
              style={{
                boxShadow: "0 8px 32px 0 rgba(33, 118, 255, 0.15), 0 1.5px 8px 0 rgba(0,0,0,0.7)",
                backdropFilter: "blur(2px)",
                border: "1.5px solid #2176FF"
              }}
            >
              <div className="flex items-center mb-2">
                <FaMicrochip className="text-cyan-400 mr-2" />
                <h4 className="text-xl font-extrabold text-[#2176FF] mb-2 drop-shadow">CPU</h4>
              </div>
              <p className="text-white text-center font-semibold">Model: <span className="text-gray-300">{specs.cpu.model}</span></p>
              <p className="text-white text-center font-semibold">Cores: <span className="text-gray-300">{specs.cpu.cores}</span></p>
              <p className="text-white text-center font-semibold">Threads: <span className="text-gray-300">{specs.cpu.threads}</span></p>
              <p className="text-white text-center font-semibold">Speed: <span className="text-gray-300">{specs.cpu.speed} GHz</span></p>
            </div>
            {/* GPU Card */}
            <div className="bg-black bg-opacity-95 rounded-2xl shadow-2xl p-10 border border-[#2176FF]/60 flex flex-col items-center w-full
  transition-transform duration-200 hover:scale-105"
              style={{
                boxShadow: "0 8px 32px 0 rgba(33, 118, 255, 0.15), 0 1.5px 8px 0 rgba(0,0,0,0.7)",
                backdropFilter: "blur(2px)",
                border: "1.5px solid #2176FF"
              }}
            >
              <div className="flex items-center mb-2">
                <FaDesktop className="text-cyan-400 mr-2" />
                <h4 className="text-xl font-extrabold text-[#2176FF] mb-2 drop-shadow">GPU</h4>
              </div>
              <p className="text-white text-center font-semibold">Model: <span className="text-gray-300">{specs.gpu}</span></p>
            </div>
            {/* RAM Card */}
            <div className="bg-black bg-opacity-95 rounded-2xl shadow-2xl p-10 border border-[#2176FF]/60 flex flex-col items-center w-full
  transition-transform duration-200 hover:scale-105"
              style={{
                boxShadow: "0 8px 32px 0 rgba(33, 118, 255, 0.15), 0 1.5px 8px 0 rgba(0,0,0,0.7)",
                backdropFilter: "blur(2px)",
                border: "1.5px solid #2176FF"
              }}
            >
              <div className="flex items-center mb-2">
                <FaMemory className="text-cyan-400 mr-2" />
                <h4 className="text-xl font-extrabold text-[#2176FF] mb-2 drop-shadow">RAM</h4>
              </div>
              <p className="text-white text-center font-semibold">Total: <span className="text-gray-300">{specs.ram} GB</span></p>
            </div>
            {/* Storage Card */}
            <div className="bg-black bg-opacity-95 rounded-2xl shadow-2xl p-10 border border-[#2176FF]/60 flex flex-col items-center w-full
  transition-transform duration-200 hover:scale-105"
              style={{
                boxShadow: "0 8px 32px 0 rgba(33, 118, 255, 0.15), 0 1.5px 8px 0 rgba(0,0,0,0.7)",
                backdropFilter: "blur(2px)",
                border: "1.5px solid #2176FF"
              }}
            >
              <div className="flex items-center mb-2">
                <FaHdd className="text-cyan-400 mr-2" />
                <h4 className="text-xl font-extrabold text-[#2176FF] mb-2 drop-shadow">Storage</h4>
              </div>
              <p className="text-white text-center font-semibold">Size: <span className="text-gray-300">{specs.storage.size} GB</span></p>
              <p className="text-white text-center font-semibold">Type: <span className="text-gray-300">{specs.storage.type}</span></p>
            </div>
            {/* OS Card */}
            <div className="bg-black bg-opacity-95 rounded-2xl shadow-2xl p-10 border border-[#2176FF]/60 flex flex-col items-center w-full
  transition-transform duration-200 hover:scale-105"
              style={{
                boxShadow: "0 8px 32px 0 rgba(33, 118, 255, 0.15), 0 1.5px 8px 0 rgba(0,0,0,0.7)",
                backdropFilter: "blur(2px)",
                border: "1.5px solid #2176FF"
              }}
            >
              <div className="flex items-center mb-2">
                <FaWindows className="text-cyan-400 mr-2" />
                <h4 className="text-xl font-extrabold text-[#2176FF] mb-2 drop-shadow">Operating System</h4>
              </div>
              <p className="text-white text-center font-semibold">Distro: <span className="text-gray-300">{specs.os.distro}</span></p>
              <p className="text-white text-center font-semibold">Arch: <span className="text-gray-300">{specs.os.arch}</span></p>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-6 w-full bg-[#181A1B] rounded-xl shadow-lg p-8 space-y-4 border border-[#2176FF]/40 text-center">
            <h3 className="text-2xl font-semibold text-[#2176FF] mb-4">Scan Results</h3>
            <p className="text-white"><span className="font-semibold text-[#2176FF]">Bottlenecks:</span> <span className="text-gray-300">{result.bottlenecks.join(", ") || "None"}</span></p>
            <p className="text-white"><span className="font-semibold text-[#2176FF]">Outdated Parts:</span> <span className="text-gray-300">{result.outdatedParts.join(", ") || "None"}</span></p>
            <p className="text-white"><span className="font-semibold text-[#2176FF]">Upgrade Suggestions:</span> <span className="text-gray-300">{result.upgradeSuggestions.join(", ") || "None"}</span></p>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full justify-items-center">
            {suggestions.map((s, idx) => (
              <div key={idx} className="bg-[#181A1B] rounded-xl shadow-lg p-8 flex flex-col justify-between border border-[#2176FF]/40 w-full items-center text-center">
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
      </div>
      <a
        href="/shop"
        className="fixed bottom-8 right-8 bg-[#2176FF] text-white font-bold px-8 py-4 rounded-xl shadow-xl border-2 border-[#181A1B] hover:bg-[#181A1B] hover:text-[#2176FF] transition-colors text-lg text-center"
        style={{ zIndex: 40 }}
      >
        Shop for PC Parts &gt;&gt;
      </a>
    </div>
  );
};

export default Scan;
