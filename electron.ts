'use strict';
import {app, BrowserWindow, ipcMain} from 'electron';
import * as log from 'electron-log';

let mainWindow;
let firstWindow;
let secondWindow;

// handle uncaughtException
process.on('uncaughtException', (err: Error) => {
  log.error(err.stack);
  app.quit();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  // アプリ起動したら、最初はmainWindowを開く
  showMainWindow();
});

// 通知を受け取ったら、対応する処理を実行する
// ウィンドウを開く
ipcMain.on('show1stWindow', (event, message: string) => {
  show1stWindow();
});
ipcMain.on('show2ndWindow', (event, message: string) => {
  show2ndWindow();
});


function showMainWindow(): void {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.show();
    mainWindow.focus();
    return;
  }

  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    acceptFirstMouse: true,
    show: false, // show at did-finish-load event
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  // !!!!
  global.mainWindow = mainWindow;

  // event
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function show1stWindow(): void {
  if (firstWindow && !firstWindow.isDestroyed()) {
    firstWindow.show();
    firstWindow.focus();
    return;
  }

  firstWindow = new BrowserWindow({
    parent: mainWindow,
    width: 400,
    height: 400,
    acceptFirstMouse: true,
    show: false, // show at did-finish-load event
  });
  firstWindow.loadURL(`file://${__dirname}/first.html`);
  // !!!!
  global.firstWindow = firstWindow;

  firstWindow.webContents.on('did-finish-load', () => {
    firstWindow.show();
    firstWindow.focus();
  });
  firstWindow.on('closed', () => {
    firstWindow = null;
  });
}

function show2ndWindow(): void {
  if (secondWindow && !secondWindow.isDestroyed()) {
    secondWindow.show();
    secondWindow.focus();
    return;
  }

  secondWindow = new BrowserWindow({
    parent: mainWindow,
    width: 400,
    height: 400,
    acceptFirstMouse: true,
    show: false, // show at did-finish-load event
  });
  secondWindow.loadURL(`file://${__dirname}/second.html`);
  // !!!!
  global.secondWindow = secondWindow;

  secondWindow.webContents.on('did-finish-load', () => {
    secondWindow.show();
    secondWindow.focus();
  });
  secondWindow.on('closed', () => {
    secondWindow = null;
  });
}

declare const global: any;
