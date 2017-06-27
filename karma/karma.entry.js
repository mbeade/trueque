require('es6-shim');
require('reflect-metadata');


//The first thing we'll do is to pull in some dependencies. The ones you may not notice are those from zone.js. Zone is a library for doing change detection. 
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
//Next, we'll pull in and store more dependencies. The first two are libraries we'll need for testing provided by Angular. They will let us set the base Angular providers we'll need to run our application. Then, we'll use those imported libraries to set up the base test providers.
const browserTesting = require('@angular/platform-browser-dynamic/testing');
const coreTesting = require('@angular/core/testing');

coreTesting.setBaseTestProviders(
    browserTesting.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    browserTesting.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);


//These two lines are the ones that start pulling in our.spec.ts files from our src directory.The.context method comes from Webpack.The second parameter of the first line tells Webpack to look in subdirectories for more files.
//After that, we'll use the context we created just like we'd use a regular require statement.This context also has a map of all the files it found where each key is the name of a file found.Hence, by running .forEach over the array of keys and calling function for each, we read in each of those .spec.ts files and, as a result, any code those tests require to run.
const context = require.context('../src/', true, /\.spec\.ts$/);
context.keys().forEach(context);


Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
