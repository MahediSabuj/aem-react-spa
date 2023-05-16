/**
 * DO NOT MODIFY
 */

let PixelMatchPlugin = require('./lib/wdio-pixelmatch-service/launcher').PixelMatchPlugin;
let wdio_config = require('./wdio.conf.commons.js').config;
let config = require('./lib/config');

wdio_config.hostname = 'localhost';
wdio_config.services = [
  ['selenium-standalone', {
    logPath: config.reports_path}
  ],
  [PixelMatchPlugin, {
    viewportSize: { height: 768, width: 1366 },
    pixelmatchDirectory: './assets'
  }]
];

// Define capabilities based on configuration
let capabilities = {};

switch(config.selenium.browser) {
  case config.CHROME:
    capabilities = {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        'excludeSwitches': ['enable-automation'],
        'prefs': {
          'credentials_enable_service': false,
          'profile.password_manager_enabled': false
        }
      }
    };

    if (config.selenium.headless === true) {
      capabilities['goog:chromeOptions'].args = ['headless'];
    }
    break;
  case config.FIREFOX:
    capabilities = {
      maxInstances: 1,
      browserName: 'firefox',
      'moz:firefoxOptions': {
        prefs: {
          // Prevent opening the extension tabs on startup
          'extensions.enabledScopes': 0
        }
      }
    };

    if (config.selenium.headless === true) {
      capabilities['moz:firefoxOptions'].args = ['-headless'];
    }
    break;
  default:
    throw new Error('Unsupported browser defined in configuration!');
}

wdio_config.capabilities = [capabilities];

exports.config = wdio_config;
