let url = require('../../config.json');
describe('PinBox 24 App Login For Module', function () {

    function openApplicationInBrowser() {
        browser.get(url.e2eUrl);
    }

    beforeEach(function () {
        openApplicationInBrowser();
    });

    /**
     * E2E Tc to show the login form
     */
    it('App should show login form', function () {
        let inputGroups = element.all(by.css('.form-control'));
        expect(inputGroups.count()).toBe(0);
    });

});