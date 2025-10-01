const API_URL = "http://localhost:5000/api";

export const scanSystem = async (specs) => {
  try {
    const res = await fetch(`${API_URL}/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(specs),
    });
    return await res.json();
  } catch (err) {
    console.error("Scan API error:", err);
    return null;
  }
};

export const checkSoftware = async (softwareName, userSpecs) => {
  try {
    const res = await fetch(`${API_URL}/compatibility`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ softwareName, userSpecs }),
    });
    return await res.json();
  } catch (err) {
    console.error("Compatibility API error:", err);
    return null;
  }
};
