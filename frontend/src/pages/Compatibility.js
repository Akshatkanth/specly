import React, { useState, useEffect } from "react";
import requirementsData from "../utils/requirements.json";

const getSavedSpecs = () => {
  const specs = localStorage.getItem("speclySpecs");
  return specs ? JSON.parse(specs) : null;
};

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

  // CPU check (basic: allow partial match or newer gen)
  if (user.cpu && reqMin.cpu && user.cpu.model) {
    const cpuMatch =
      user.cpu.model.toLowerCase().includes(reqMin.cpu.toLowerCase()) ||
      user.cpu.model.toLowerCase().includes(reqRec?.cpu?.toLowerCase() || "");
    if (!cpuMatch) {
      meetsMin = false;
      issues.push("CPU");
    }
    if (reqRec && !user.cpu.model.toLowerCase().includes(reqRec.cpu.toLowerCase())) meetsRec = false;
  }

  // GPU check (basic: allow partial match or newer gen)
  if (user.gpu && reqMin.gpu && reqMin.gpu !== "Any") {
    const gpuMatch =
      user.gpu.toLowerCase().includes(reqMin.gpu.toLowerCase()) ||
      user.gpu.toLowerCase().includes(reqRec?.gpu?.toLowerCase() || "");
    if (!gpuMatch) {
      meetsMin = false;
      issues.push("GPU");
    }
    if (reqRec && reqRec.gpu !== "Any" && !user.gpu.toLowerCase().includes(reqRec.gpu.toLowerCase())) meetsRec = false;
  }

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
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-32 bg-black">
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
  );
};

export default Compatibility;
