module.exports = function (config) {
    config.set(
        {

            // base path, that will be used to resolve files and exclude
            basePath: '',


            // frameworks to use
            frameworks: ['jasmine'],


            // list of files / patterns to load in the browser
            files: [
                'node_modules/vue/dist/vue.min.js',
                'node_modules/izi-js/dist/izi-js.min.js',
                'dist/izi-js-vue.min.js',
                {pattern: 'test/*Spec.js', watched: true, included: true, served: true},
                {pattern: 'dist/*', watched: true, included: false, served: true},
                {pattern: 'node_modules/izi-js/dist/*', watched: true, included: false, served: true},
                {pattern: 'node_modules/vue/dist/*', watched: true, included: false, served: true}
            ],


            // list of files to exclude
            exclude: [
            ],


            // test results reporter to use
            // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
            reporters: ['progress', 'dots', 'html'],


            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: false,


            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera
            // - Safari (only Mac)
            // - PhantomJS
            // - IE (only Windows)
            browsers: ['Chrome', 'Firefox', 'PhantomJS'],


            // If browser does not capture in given timeout [ms], kill it
            captureTimeout: 60000,


            // Continuous Integration mode
            // if true, it capture browsers, run tests and exit
            singleRun: false
        }
    );
};