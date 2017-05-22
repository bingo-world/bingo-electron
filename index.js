const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow( 
            { 
                height: 800,
                width: 1280
            });
    //win.setFullScreen(true);

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('version', process.env.npm_package_version);
    });

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});