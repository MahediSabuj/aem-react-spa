const config = require('../../lib/config');
const expect = require('chai').expect;
const url = require('url');

describe('AEM Login Page', () => {

  // Force AEM Logout
  beforeEach(() => {
    browser.AEMForceLogout();
  });

  it('should redirect to login page by default', () => {
    browser.url(config.aem.author.base_url);

    let redirectedURL = url.parse(browser.getUrl());

    expect(redirectedURL.pathname.endsWith('login.html')).to.be.true;
  });

  it('should contain the login form', () => {
    browser.url(config.aem.author.base_url);

    $('#username').waitForExist();
    $('#password').waitForExist();
    $('form [type="submit"]').waitForExist();
  });

  it('should login with correct credentials', () => {
    browser.url(config.aem.author.base_url);

    browser.AEMLogin(config.aem.author.username, config.aem.author.password);

    $('coral-shell').waitForExist();
    $('coral-shell-header').waitForExist();
  });

});
