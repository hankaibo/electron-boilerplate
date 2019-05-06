import log4js from 'log4js';
import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log4jsConfig from '../../config/log4js.js';

log4js.configure(log4jsConfig);
const logger = log4js.getLogger('autoupdate.js');

autoUpdater.logger = logger;
logger.debug('App starting...');

const sendStatusToWindow = (win, text) => {
  logger.info(text);
  win.webContents.send('message', text);
};

export default win => {
  autoUpdater.on('error', err => {
    logger.debug(err);
    sendStatusToWindow(win, 'Error in auto-updater. ' + err);
  });
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow(win, 'Checking for update...');
  });
  autoUpdater.on('update-available', info => {
    logger.debug(info);
    sendStatusToWindow(win, 'Update available.');
  });
  autoUpdater.on('update-not-available', info => {
    logger.debug(info);
    sendStatusToWindow(win, 'Update not available.');
  });
  autoUpdater.on('download-progress', progressObj => {
    let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
    sendStatusToWindow(win, log_message);
    win.webContents.send('downloadProgress', progressObj);
  });
  autoUpdater.on('update-downloaded', info => {
    sendStatusToWindow(win, 'Update downloaded');
    ipcMain.on('isUpdateNow', (event, args) => {
      logger.debug(arguments);
      logger.debug('start updateing ...');
      autoUpdater.quitAndInstall();
    });
    win.webContents.send('isUpdateNow');
  });

  ipcMain.on('checkForUpdate', () => {
    //执行自动更新检查
    autoUpdater.checkForUpdates();
  });
};
