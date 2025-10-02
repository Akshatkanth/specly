const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const si = require("systeminformation");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,  // keep secure
      contextIsolation: true,  // required for preload
    },
  });

  // Development
  mainWindow.loadURL("http://localhost:3000");

  // Production build
  // mainWindow.loadFile(path.join(__dirname, "build", "index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// --------------------------
// IPC Handlers
// --------------------------
ipcMain.handle("get-specs", async () => {
  try {
    const cpu = await si.cpu();
    const gpuData = await si.graphics();
    const ram = await si.mem();
    const disk = await si.fsSize();
    const osInfo = await si.osInfo();

    const detectedSpecs = {
      cpu: {
        model: cpu.brand,
        cores: cpu.cores,
        threads: cpu.processors || cpu.cores * 2,
        speed: cpu.speed
      },
      gpu: gpuData.controllers[0]?.model || "Integrated GPU",
      ram: Math.round(ram.total / (1024 ** 3)), // GB
      storage: { size: Math.round(disk[0].size / (1024 ** 3)), type: disk[0].type || "SSD" },
      os: { distro: osInfo.distro, arch: process.arch }
    };

    return detectedSpecs;
  } catch (err) {
    console.error("Failed to get specs:", err);
    return null;
  }
});
