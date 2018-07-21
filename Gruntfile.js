module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        protractor_webdriver: {
            options: {
                keepAlive: true
            },
            start: {
                // Target-specific file lists and/or options go here.
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/example/conf.js", // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                webdriverManagerUpdate: true,
                args: {
                    // Arguments passed to the command
                }
            },
            start: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "test/e2e.conf.js", // Target-specific config file
                    args: {} // Target-specific arguments
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-protractor-runner');

    // Grunt task(s).
    grunt.registerTask('test-e2e', ['protractor_webdriver:start', 'protractor:start']);
};