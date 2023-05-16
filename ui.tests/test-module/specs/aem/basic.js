const config = require('../../lib/config');

describe('AEM Basic', () => {

  // AEM Login
  beforeEach(() => {
    browser.AEMForceLogout();
    browser.url(config.aem.author.base_url);
    browser.AEMLogin(config.aem.author.username, config.aem.author.password);
  });

  it('should be possible to display Solutions panel', () => {
    browser.url(config.aem.author.base_url);

    $('[data-foundation-toggleable-control-src$="solutionswitcher.html"]').click();

    $('coral-shell-solutionswitcher').waitForDisplayed();
  });

});
