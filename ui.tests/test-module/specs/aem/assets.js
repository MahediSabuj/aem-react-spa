const path = require('path');
const config = require('../../lib/config');
const commons = require('../../lib/commons');

describe('AEM Assets', () => {

  // AEM Login
  beforeEach(() => {
    browser.AEMForceLogout();
    browser.url(config.aem.author.base_url);
    browser.AEMLogin(config.aem.author.username, config.aem.author.password);
  });

  let onboardingHdler;

  before(function() {
    // Enable helper to handle onboarding dialog popup
    onboardingHdler = new commons.OnboardingDialogHandler(browser);
    onboardingHdler.enable();
  });

  after(function() {
    // Disable helper to handle onboarding dialog popup
    onboardingHdler.disable();
  });

  it.skip('should be possible to upload an asset', () => {
    let assetsPath = '/content/dam';
    let imageName = 'image.png';
    let imagePath = `${assetsPath}/${imageName}`;

    // Go to the Assets page.
    browser.url(`${config.aem.author.base_url}/assets.html${assetsPath}`);

    // Compute the handle for the asset.
    let handle = browser.getFileHandleForUpload(path.join(__dirname, '..', '..', 'assets', imageName));

    // Required when AEM language is not "English"
    browser.refresh();

    // Add the handle to the web page element.
    $('dam-chunkfileupload > input').addValue(handle);

    // Wait two seconds for the upload dialog to be interactive.
    browser.pause(2000);

    // Press the upload button.
    $('coral-dialog.is-open coral-dialog-footer [variant="primary"]').click();

    // Wait until Asset exists
    browser.waitUntil(function() {
      return browser.AEMPathExists(browser.options.baseUrl, imagePath);
    }, {
      timeoutMsg: `asset ${imagePath} should exist`
    });

    // Delete Asset
    browser.AEMDeleteAsset(imagePath);

    // Wait until Asset does not exist anymore
    browser.waitUntil(function() {
      return true !== browser.AEMPathExists(config.aem.author.base_url, imagePath);
    }, {
      timeoutMsg: `asset ${imagePath} should not exist`
    });
  });

});
