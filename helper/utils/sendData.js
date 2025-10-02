const si = require("systeminformation");
const osu = require("node-os-utils");

async function getSystemSpecs() {
  try {
    // CPU
    const cpuData = await si.cpu();
    const cpu = {
      manufacturer: cpuData.manufacturer,
      brand: cpuData.brand,
      speed: cpuData.speed,
      cores: cpuData.cores,
      physicalCores: cpuData.physicalCores
    };

    // GPU
    const graphicsData = await si.graphics();
    const gpu = graphicsData.controllers.length > 0
      ? graphicsData.controllers.map(g => `${g.vendor} ${g.model}`)[0]
      : "Unknown GPU";

    // RAM
    const memData = await si.mem();
    const ram = Math.round(memData.total / (1024 * 1024 * 1024)); // GB

    // Storage (take first disk)
    const disks = await si.diskLayout();
    const storage = disks.length > 0
      ? { size: Math.round(disks[0].size / (1024 * 1024 * 1024)), type: disks[0].type }
      : { size: 0, type: "Unknown" };

    // OS
    const os = await si.osInfo();

    return { cpu, gpu, ram, storage, os };
  } catch (err) {
    console.error("Error fetching system specs:", err);
    return null;
  }
}

module.exports = getSystemSpecs;
