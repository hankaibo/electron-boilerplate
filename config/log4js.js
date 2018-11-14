const { app } = require('electron');

const appPath = app.getPath('userData');

module.exports = {
  appenders: {
    access: {
      type: 'dateFile',
      filename: `${appPath}/logs/access.log`,
      pattern: '-yyyy-MM-dd',
      category: 'http'
    },
    app: {
      type: 'file',
      filename: `${appPath}/logs/app.log`,
      maxLogSize: 10485760,
      numBackups: 3
    },
    errorFile: {
      type: 'file',
      filename: `${appPath}/logs/errors.log`
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile'
    }
  },
  categories: {
    default: { appenders: ['app', 'errors'], level: 'debug' },
    http: { appenders: ['access'], level: 'debug' }
  }
};
