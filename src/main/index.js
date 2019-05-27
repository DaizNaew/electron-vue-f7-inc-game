/* eslint-disable no-undef */
'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
const Store = require('../scripts/store');

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

const store = new Store({
    configName: 'user-preferences',
    defaults: {
        windowBounds: {
            width: 1366,
            height: 720,
        }
    }
})

function createMainWindow() {
    let {width, height} = store.get('windowBounds');
  
    const window  = new BrowserWindow({
        title: true,
        width,
        height,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false
    });

    if (isDevelopment) {
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
        window.webContents.openDevTools();
    }
    else {
        window.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
    }

    window.on('closed', () => {
        mainWindow = null
    })

    window.webContents.on('devtools-opened', () => {
        window.focus()
        setImmediate(() => {
            window.focus()
        })
    })

    window.on('resize', () => {
        let {width, height} = mainWindow.getBounds();
        store.set('windowBounds', {width, height});
    })

    return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow()
    }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow()
})