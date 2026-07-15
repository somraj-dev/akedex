const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// ─── Fix GPU cache creation errors that cause white screen on Windows ───
// Must be called before app.whenReady()
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('no-sandbox');

// Set a clean user data path to avoid permission conflicts with GPU cache
const userDataPath = path.join(app.getPath('appData'), 'Acadex');
app.setPath('userData', userDataPath);

// Clear GPU cache on startup to prevent stale locks
const gpuCacheDir = path.join(userDataPath, 'GPUCache');
try {
  if (fs.existsSync(gpuCacheDir)) {
    fs.rmSync(gpuCacheDir, { recursive: true, force: true });
  }
} catch (e) { /* ignore if locked */ }

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    title: "Acadex — Education Operating Environment",
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'public/favicon.ico'),
    // Start hidden; show only after page is fully loaded to avoid white flash
    show: false,
    backgroundColor: '#005a84',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // Disable webgl to avoid GPU issues
      webgl: false,
    }
  });

  // Load Next.js dev server in dev, static files in production
  const isDev = !app.isPackaged;
  if (isDev) {
    win.loadURL('http://localhost:3002');
  } else {
    win.loadFile(path.join(__dirname, 'out/index.html'));
  }

  // Show window only after DOM content is fully ready
  win.webContents.on('did-finish-load', () => {
    win.show();
  });

  // Handle load failures gracefully — retry after delay
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`Failed to load: ${errorDescription} (${errorCode})`);
    // Retry loading after 2 seconds
    setTimeout(() => {
      if (isDev) {
        win.loadURL('http://localhost:3002');
      } else {
        win.loadFile(path.join(__dirname, 'out/index.html'));
      }
    }, 2000);
  });

  // Fallback: show window after 10 seconds even if load event doesn't fire
  setTimeout(() => {
    if (!win.isVisible()) {
      win.show();
    }
  }, 10000);

  // Handle window closing gracefully
  win.on('closed', () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
