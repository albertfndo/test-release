import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { routes } from "./routes";
import { autoUpdater } from "electron-updater";
import log from "electron-log";

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js
// │ ├─┬ preload
// │ │ └── index.js
// │ ├─┬ renderer
// │ │ └── index.html

process.env.ROOT = path.join(__dirname, "..");
process.env.DIST = path.join(process.env.ROOT, "dist-electron");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, "public")
  : path.join(process.env.ROOT, ".output/public");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "false";

log.initialize({ preload: true });

log.transports.file.resolvePathFn = () =>
  path.join(process.env.ROOT as string, "logs/main.log");

let win: BrowserWindow;

autoUpdater.logger = log;

autoUpdater.setFeedURL({
  provider: "github",
  owner: process.env.GITHUB_OWNER,
  repo: process.env.GITHUB_REPO,
  private: true, // Set to true if your repo is private
  token: process.env.GITHUB_TOKEN,
});

function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on("update-available", () => {
    win.webContents.send("update_available");
  });

  autoUpdater.on("update-not-available", () => {
    win.webContents.send("update_not_available");
  });

  autoUpdater.on("download-progress", (progressObj) => {
    const progress = `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`;
    win.webContents.send("downloaded_progress", progress);
  });

  autoUpdater.on("update-downloaded", () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on("error", (err) => {
    // Handle error
    log.error(err);
  });
}

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      // preload,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  if (process.env.NUXT_PUBLIC_APP_URL) {
    win.loadURL(process.env.NUXT_PUBLIC_APP_URL as string);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC as string, "index.html"));
  }

  win.maximize();
}

function runIpcMain() {
  const keys = Object.keys(routes);

  for (const key of keys) {
    ipcMain.on(key, (event, data) => {
      routes[key](event, data);
    });
  }
}

app.setName("HWG Bottle Keeping");
app.whenReady().then(() => {
  createWindow();
  runIpcMain();
  checkForUpdates();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();

      runIpcMain();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
