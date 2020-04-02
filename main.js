const {app,BrowserWindow,Menu} = require('electron');

function createWindow () {
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 992,
    minHeight: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }

  })

  win.loadFile('index.html');

  win.on('ready-to-show', () =>{
    win.show(); 
    });

  win.webContents.openDevTools();
  
const menu = Menu.buildFromTemplate([]);
Menu.setApplicationMenu(null);
}
app.on('ready', createWindow);