import { BrowserWindow, app } from 'electron'
import path from 'path'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  // win.loadURL('http://localhost:2000')
  win.loadFile(path.resolve(__dirname, '../../client/dist/index.html'))
}

app.whenReady().then(() => {
  createWindow()
})