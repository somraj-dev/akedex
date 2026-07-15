const { app, BrowserWindow } = require('electron');
const path = require('path');

// Fix GPU cache creation errors that cause white screen on Windows
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');

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
    }
  });

  // Load Next.js dev server in dev, static files in production
  const isDev = !app.isPackaged;
  if (isDev) {
    win.loadURL('http://localhost:3002');
    // Open DevTools in dev mode to debug white screen issues
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, 'out/index.html'));
  }

  // Show window only after DOM content is fully ready
  win.webContents.on('did-finish-load', () => {
    win.show();
  });

  // Fallback: show window after 8 seconds even if load event doesn't fire
  setTimeout(() => {
    if (!win.isVisible()) {
      win.show();
    }
  }, 8000);

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
