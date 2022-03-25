'use strict';

var electron = require('electron');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

function createWindow () {
  const win = new electron.BrowserWindow({
    width: 800,
    height: 600
  });
  console.log(process.env.NODE_ENV);
  // win.loadURL('http://localhost:2000')
  win.loadFile(path__default["default"].resolve(__dirname, '../../client/dist/index.html'));
}

electron.app.whenReady().then(() => {
  createWindow();
});
