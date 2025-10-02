import React, { useState } from "react";

const Scan = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    setScanning(true);
    // Mocking scan result
    setTimeout(() => {
      setResult({
        bottlenecks: ["RAM", "GPU"],
        outdatedParts: ["GPU"],
        upgradeSuggestions: ["Upgrade RAM to 16GB", "Upgrade GPU to a dedicated card"]
      });
      setScanning(false);
    }, 1500);
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

      {result && (
        <div className="mt-10 w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Scan Results</h3>
          <p>
            <span className="font-semibold">Bottlenecks:</span> {result.bottlenecks.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Outdated Parts:</span> {result.outdatedParts.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Upgrade Suggestions:</span> {result.upgradeSuggestions.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Scan;
