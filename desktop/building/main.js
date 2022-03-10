"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600
    });
    win.loadFile(path_1.default.resolve(__dirname, '../../client/dist/index.html'));
}
electron_1.app.whenReady().then(() => {
    createWindow();
});
