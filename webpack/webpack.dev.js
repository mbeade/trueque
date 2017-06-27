'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;

const rootDir = path.resolve(__dirname, '..');

module.exports = {


    // web dev server config  
    devServer: {
        contentBase: path.resolve(rootDir, 'dist'),
        port: 9000
    },


    // ?
    devtool: 'source-map',

    //Here, we're telling Webpack that there are two entry points for our code. One is going to be src/bootstrap.ts, 
    //and the other will be src/vendor.ts. The file vendor.ts will be our entry to load the third-party code, such as Angular, 
    //while bootstrap.ts is where our application code will begin.
    entry: {
        polyfills: [path.resolve(rootDir, 'src', 'polyfills')],
        vendor: [path.resolve(rootDir, 'src', 'vendor')],
        app: [path.resolve(rootDir, 'src', 'bootstrap')]
    },


    // module loaders config
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'raw-loader'
            },
            {
                test: /\.ts$/,
                loader: ["ts-loader?configFileName=tsconfig.json", "angular2-template-loader"]
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
        ]
    },

    // Output bundle [name] is a placeholder that comes from entry section - will create two bundles app.bundle.js and vendor.bundle.js
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(rootDir, 'dist')
    },

    //The two plugins we pulled in earlier — ChunkWebpack and HtmlWebpack — 
    //are utilized in the plugins section. 
    //The chunk plugin makes Webpack pull in the file which is referenced many times only once. 
    //The HTML plugin keeps us from having to add <script> tags to our index.html. 
    //It just takes the bundles we created in the output section and injects them into the <body> of index.html.
    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),

        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(rootDir, 'src', 'index.html')
        }),


        // Workaround for Angular-SystemJS-Webpack(2) WARNINGS
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(rootDir, 'src'), // location of your src
            {
                // your Angular Async Route paths relative to this root directory
            }
        )
    ],


    // ?
    resolve: {
        extensions: ['.ts', '.js']
    }
}