'use strict';

module.exports = (config) => {
    config.set({

        autoWatch: true,

        browsers: ['Chrome', 'PhantomJS'],

        files: [
            '../node_modules/es6-shim/es6-shim.min.js', // Required by phantom
            'karma.entry.js'
        ],

        frameworks: ['jasmine'],

        logLevel: config.LOG_INFO,

        //This is a configuration item specific to PhantomJS which tells it to shut down if Karma throws a ResourceError. If we didn't, PhantomJS might not shut down, and this would eat away at our system resources.
        phantomJsLauncher: {
            exitOnResourceError: true
        },
        //We tell Karma to run a list of preprocessors on our karma.entry.js file. Those preprocessors are the Webpack preprocessor we installed earlier with karma-webpack and the sourcemap preprocessor installed with karma-sourcemap-loader. Karma and Webpack work in conjunction to look for the chain of dependencies starting with karma.conf.js and load sourcemaps as they run.
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },


        //The first line tells Karma to use the dots reporter, which, instead of outputting a narrative descriptor for each test, just outputs a single dot, unless the test fails, in which case we get a descriptive message.
        //The second line tells it that we'll be rerunning the tests, so Karma can keep running after it completes running all the tests.
        reporters: ['dots'],
        singleRun: false,

        //The last two lines of our configuration set up Webpack for use with Karma. The first tells the karma-webpack plugin that the Webpack configuration file is located in our root directory's webpack directory under the filename webpack.test.js.
        //Webpack outputs a lot of messages, which can become cumbersome when we run tests in the console. To combat this, we'll set up the Webpack server to keep its output to a minimum by setting noInfo to true.
        webpack: require('../webpack/webpack.test'),
        webpackServer: {
            noInfo: true
        }
        
    });
};