const { app, BrowserWindow } = require('electron');
const path = require('path');
const { scanSpecs } = require('./scanner');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));

    // Run scan after window is ready
    win.webContents.once('did-finish-load', () => {
        scanSpecs();
    });
}

app.whenReady().then(createWindow);
