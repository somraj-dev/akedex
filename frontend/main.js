const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    title: "Acadex — Education Operating Environment",
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'public/favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Load Next.js dev server in dev, static files in production
  const isDev = !app.isPackaged;
  if (isDev) {
    win.loadURL('http://localhost:3002');
  } else {
    win.loadFile(path.join(__dirname, 'out/index.html'));
  }

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
