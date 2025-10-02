import React, { useState } from "react";
import { scanSystem, checkSoftware } from "./services/api";

function App() {
  const [scanResults, setScanResults] = useState(null);
  const [softwareResults, setSoftwareResults] = useState(null);

  const handleScan = async () => {
    
    const dummySpecs = {
      cpu: { model: "Intel i5", cores: 4, threads: 8, speed: 2.4 },
      gpu: { model: "Integrated", vram: 0 },
      ram: { size: 8 },
      storage: [{ type: "SSD", size: 256 }],
      os: "Windows 11",
      deviceType: "laptop",
    };

    const result = await scanSystem(dummySpecs);
    setScanResults(result);
  };

  const handleCheckSoftware = async () => {
    const dummyUserSpecs = {
      cpu: "Intel i5",
      gpu: "Integrated",
      ram: 8,
      storage: 256,
    };

    const result = await checkSoftware("Cyberpunk 2077", dummyUserSpecs);
    setSoftwareResults(result);
  };

  return (
    <div className="App">
      <header className="navbar">
        <h1>Specly</h1>
      </header>

      <main className="content">
        <h2>Welcome to Specly</h2>
        <div className="buttons">
          <button onClick={handleScan}>Scan My System</button>
          <button onClick={handleCheckSoftware}>Check Software/Game</button>
        </div>

        {scanResults && (
          <div className="results">
            <h3>Scan Results:</h3>
            <pre>{JSON.stringify(scanResults, null, 2)}</pre>
          </div>
        )}

        {softwareResults && (
          <div className="results">
            <h3>Software/Game Check:</h3>
            <pre>{JSON.stringify(softwareResults, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
