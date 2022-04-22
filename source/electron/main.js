const {
  app,
  Menu,
  MenuItem,
  BrowserWindow,
  shell,
  remote,
  ipcMain,
  session,
  globalShortcut,
  crashReporter,
  webFrame,
} = require('electron');
// const Sentry = require('@sentry/react');

const path = require('path');
const url = require('url');
const os = require('os');
const isDev = require('electron-is-dev');
const fs = require('fs');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

// const { getIgnoreErrors, getDenyUrls } = require('jsutils');

let mainWindow;
let menu = Menu.buildFromTemplate([
  ...(process.platform === 'darwin'
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
          ],
        },
      ]
    : []),
  {
    label: 'File',
    submenu: [
      process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(process.platform === 'darwin'
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
            },
          ]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
    ],
  },
  {
    label: 'View',
    submenu: isDev
      ? [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
        ]
      : [{ role: 'togglefullscreen' }],
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(process.platform === 'darwin'
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' },
          ]
        : [{ role: 'close' }]),
    ],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          await shell.openExternal('https://electronjs.org');
        },
      },
    ],
  },
]);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 768,
    minHeight: 560,
    titleBarStyle: 'hiddenInset',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      paintWhenInitiallyHidden: true,
      webSecurity: false,
      plugins: true,
      javascript: true,
    },
  });

  mainWindow.setMenu(menu);
  Menu.setApplicationMenu(menu);

  // save session on global
  const ses = mainWindow.webContents.session;
  global.userAgent = ses.getUserAgent();

  // context menu
  mainWindow.webContents.on('context-menu', (e, params) => {
    const ctxMenu = new Menu();
    const menuItem = new MenuItem({
      label: 'Inspect Element',
      click: () => {
        mainWindow.inspectElement(params.x, params.y);
      },
    });
    ctxMenu.append(menuItem);
    ctxMenu.popup(mainWindow, params.x, params.y);
  });

  mainWindow.loadURL(
    isDev
      ? 'https://localhost:8081'
      : url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true,
        })
  );

  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.on('close', () => {
    mainWindow.webContents.send('close_window');
  });

  mainWindow.webContents.on('did-finish-load', () => {});
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on(
  'certificate-error',
  (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
  }
);

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

app.whenReady().then(() => {
  // https://github.com/electron/electron/issues/18397
  app.allowRendererProcessReuse = false;

  if (!isDev) {
    globalShortcut.register('CommandOrControl+R', () => {});
    globalShortcut.register('CommandOrControl+Shift+R', () => {});
    globalShortcut.register('CommandOrControl+Alt+I', () => {});
  }

  createWindow();
});

ipcMain.handle('closeWindow', () => {
  mainWindow.close();
});

ipcMain.handle('minimizeWindow', () => {
  mainWindow.minimize();
});

ipcMain.handle('maximizeWindow', () => {
  if (!mainWindow.isMaximized()) mainWindow.maximize();
  else mainWindow.unmaximize();
});

ipcMain.handle('displayAppMenu', (event, args) => {
  menu.popup({
    window: mainWindow,
    x: args.x,
    y: args.y,
  });
});
