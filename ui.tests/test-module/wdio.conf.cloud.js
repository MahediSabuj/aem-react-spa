let PixelMatchPlugin = require('./lib/wdio-pixelmatch-service/launcher').PixelMatchPlugin;
let wdio_config = require('./wdio.conf.commons.js').config;
let config = require('./lib/config');

wdio_config.hostname =  config.selenium.hostname;
wdio_config.port = config.selenium.port;
wdio_config.path = '/wd/hub';
wdio_config.services = [
  [PixelMatchPlugin, {
    viewportSize: { height: 768, width: 1366 },
    pixelmatchDirectory: './assets'
  }]
];
let capabilities = {
  maxInstances: 1,
  browserName: config.selenium.browser,
};

// Set common startup arguments to improve stability in Docker
switch(config.selenium.browser) {
  case config.CHROME:
    capabilities['goog:chromeOptions'] = {
      args: ['headless', 'disable-gpu', 'no-sandbox', 'disable-dev-shm-usage']
    };
    break;
  case config.FIREFOX:
    capabilities['moz:firefoxOptions'] = {
      args: ['-headless']
    };
    break;
}

wdio_config.capabilities = [capabilities];

exports.config = wdio_config;
