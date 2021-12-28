const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

// This if statment will only execute if it's development enviroment.
if (!app.isPackaged) {
	/*
		Enable Hot Reload so as soon as you update your svelte code,
		it will automatically reflect on the electron window
	*/
	try { require('electron-reloader')(module); }
	catch {}
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1000, // set Window width
		height: 700, // set Window height
		icon: path.join(__dirname, '../public/favicon.png'), // set Window Icon
		webPreferences: {
			preload: path.join(__dirname, './preload.js'), // set the preload script
			contextIsolation: true, // protect against prototype pollution
			enableRemoteModule: false // turn off remote module
		}
	});

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
};

ipcMain.handle("get/version", () => app.getVersion())

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
