import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { routes } from "./routes";

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
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win: BrowserWindow;

function bootstrap() {
  win = new BrowserWindow({
    webPreferences: {
      // preload,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    // win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, "index.html"));
  }

  win.maximize();
}

function runIpcMain() {
  const keys = Object.keys(routes);

  for (let key of keys) {
    ipcMain.on(key, (event, data) => {
      routes[key](event, data);
    });
  }
}

app.setName("HWG Bottle Keeping");
app.whenReady().then(() => {
  runIpcMain();

  bootstrap();
});
