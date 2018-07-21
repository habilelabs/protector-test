let HTMLReport = require('protractor-html-reporter');
let jasmineReporters = require('jasmine-reporters');
let request = require('request');
let config = require('./config.json');
let fs = require('fs');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec/e2e/*.js'],
    allScriptsTimeout: 300000,
    capabilities: {
        browserName: 'chrome'
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 250000,
        isVerbose: true,
        includeStackTrace: true,
        print: function () {
        }
    },
    onPrepare: function () {
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './',
            filePrefix: 'xmlresults'
        }));
    },
    //HTMLReport called once tests are finished
    onComplete: function () {
        let browserName, browserVersion;
        let capsPromise = browser.getCapabilities();
        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            testConfig = {
                reportTitle: 'Test Execution Report',
                outputPath: './',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true
            };
            new HTMLReport().from('xmlresults.xml', testConfig);
            setTimeout(function () {
                fs.readFile("./chrome-test-report.html", function (err, data) {
                    if (err) throw err;
                    let formData = {
                        reportData: data
                    };
                    const options = {
                        uri: config.apiUrl,
                        formData: formData,
                        method: 'POST'
                    };
                    request(options, (err, response, body) => {
                        console.log('Request complete');
                        if (err) console.log('Request err: ', err);
                        console.log(body);
                    })
                });
            }, 3000);
        });
    }
};
