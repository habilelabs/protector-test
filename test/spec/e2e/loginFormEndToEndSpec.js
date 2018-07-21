let config = require('../../config.json');
describe('Google Search Page', function () {

    function openApplicationInBrowser() {
        browser.waitForAngularEnabled(config.isAngularApp);
        browser.get(config.e2eUrl);
    }

    beforeEach(function () {
        openApplicationInBrowser();
    });

    /**
     * E2E Tc to show the login form
     */
    it('App should show google search page', function () {
        expect(browser.getTitle()).toEqual('Google');
    });

});