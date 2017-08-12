

'use strict';

const path = require('path');
// The first attribute in the configuration defines that we'll be using inline source maps as our debugging helper.

module.exports = {
    devtool: 'inline-source-map',

    // We can also specify preLoaders which run before our regular loaders. We could put this loader with the other "regular" loaders, 
    // but as our application grows, having this separation of concerns will help prevent compilation from getting sluggish.
    // Our first "real" loader will take .css and .html files and pull them in raw, whithout doing any processing, 
    // but will pull them in as JavaScript modules. We'll then load all .ts files with the ts-loader we installed before, 
    // which is going to run each file through the TypeScript compiler. The exclude attribute allows us to avoid compiling any third-party TypeScript files. 
    // In this case, it will avoid pulling in any TypeScript files from the node_modules directory.
    module: {
        loaders: [
            { loader: 'raw-loader', test: /\.(css|html)$/ },
            { exclude: /node_modules/, loader: 'ts-loader', test: /\.ts$/ }
        ]
    },

    //This section lets Webpack know which types of file extensions it should be loading. 
    // The empty string is needed for pulling in Node modules which do not need to provide an extension — for instance, 
    // how we pulled in path before. We also inform Webpack that the root directory for our modules is our src directory and that any external
    // modules can be found in the node_modules directory.
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    }

    
}