import React, { useState, useEffect } from "react";
import requirementsData from "../utils/requirements.json";
import bgStars from "./assets/bg.jpg";

const getSavedSpecs = () => {
  const specs = localStorage.getItem("speclySpecs");
  return specs ? JSON.parse(specs) : null;
};

function isBetterHardware(userPart, reqPart) {
  // If "Any", always compatible
  if (!reqPart || reqPart === "Any") return true;
  if (!userPart) return false;

  // Lowercase for comparison
  const user = userPart.toLowerCase();
  const req = reqPart.toLowerCase();

  // Brand check
  if (req.includes("intel") && !user.includes("intel")) return false;
  if (req.includes("amd") && !user.includes("amd")) return false;
  if (req.includes("nvidia") && !user.includes("nvidia")) return false;

  // Extract numbers for basic comparison
  const userNum = parseInt(user.replace(/\D/g, ""));
  const reqNum = parseInt(req.replace(/\D/g, ""));

  // If numbers exist, compare them
  if (userNum && reqNum && userNum >= reqNum) return true;

  // Fallback: substring match
  if (user.includes(req)) return true;

  return false;
}

function compareSpecs(user, reqMin, reqRec) {
  if (!user) return { status: "No scan data found.", suggestion: "" };

  let issues = [];
  let meetsMin = true;
  let meetsRec = true;

  // RAM check
  if (user.ram < reqMin.ram) {
    meetsMin = false;
    issues.push("RAM");
  }
  if (reqRec && user.ram < reqRec.ram) meetsRec = false;

  // CPU check (improved)
  if (!isBetterHardware(user.cpu?.model, reqMin.cpu)) {
    meetsMin = false;
    issues.push("CPU");
  }
  if (reqRec && !isBetterHardware(user.cpu?.model, reqRec.cpu)) meetsRec = false;

  // GPU check (improved)
  if (!isBetterHardware(user.gpu, reqMin.gpu)) {
    meetsMin = false;
    issues.push("GPU");
  }
  if (reqRec && !isBetterHardware(user.gpu, reqRec.gpu)) meetsRec = false;

  if (meetsRec) {
    return {
      status: "Compatible",
      suggestion: "You can run this on high settings with smooth FPS (60+ expected).",
    };
  } else if (meetsMin) {
    return {
      status: "May Run",
      suggestion: "Lower graphics/settings recommended. Expected FPS: 30-45.",
    };
  } else {
    return {
      status: "Not Compatible",
      suggestion: `Your PC does not meet the minimum requirements for: ${issues.join(", ")}.`,
    };
  }
}

const Compatibility = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [userSpecs, setUserSpecs] = useState(null);

  useEffect(() => {
    setUserSpecs(getSavedSpecs());
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length < 2) {
      setResults([]);
      return;
    }
    const filtered = requirementsData.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url(${bgStars})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.95) 80%, #2176FF 120%)",
          opacity: 0.85,
        }}
      ></div>
      <div className="relative w-full min-h-screen flex flex-col items-center justify-start pt-32">
        <h2 className="text-4xl font-bold text-[#2176FF] mb-8">Compatibility Checker</h2>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for a game or software..."
          className="w-full max-w-xl px-6 py-4 rounded-xl bg-[#181A1B] text-white border-2 border-[#2176FF] focus:outline-none focus:ring-2 focus:ring-[#2176FF] mb-8"
        />
        {results.length === 0 && search.length > 1 && (
          <p className="text-gray-400">No results found.</p>
        )}
        <div className="w-full max-w-3xl space-y-8">
          {results.map((item, idx) => {
            const comp = compareSpecs(userSpecs, item.min, item.rec);

            return (
              <div key={idx} className="bg-[#181A1B] rounded-xl p-6 shadow-lg border border-[#2176FF]/40">
                <h3 className="text-2xl font-bold text-[#2176FF] mb-2">{item.name}</h3>
                <div className="mb-2">
                  <span className="font-semibold text-white">Minimum:</span>
                  <span className="text-gray-300 ml-2">
                    CPU: {item.min.cpu}, RAM: {item.min.ram}GB, GPU: {item.min.gpu}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-white">Recommended:</span>
                  <span className="text-gray-300 ml-2">
                    CPU: {item.rec.cpu}, RAM: {item.rec.ram}GB, GPU: {item.rec.gpu}
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-semibold text-white">Your PC:</span>
                  {userSpecs ? (
                    <span className="text-gray-300 ml-2">
                      CPU: {userSpecs.cpu?.model}, RAM: {userSpecs.ram}GB, GPU: {userSpecs.gpu}
                    </span>
                  ) : (
                    <span className="text-red-400 ml-2">No scan data found.</span>
                  )}
                </div>
                <div className="mt-4">
                  <span className="font-semibold text-white">Compatibility:</span>
                  <span
                    className={`ml-2 px-4 py-2 rounded-full font-bold ${
                      comp.status === "Compatible"
                        ? "bg-[#2176FF] text-white"
                        : comp.status === "May Run"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {comp.status}
                  </span>
                  {comp.suggestion && (
                    <div className="mt-2 text-sm text-gray-300">{comp.suggestion}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Compatibility;
