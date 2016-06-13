//set webpack and path instances
var webpack = require('webpack'),
       path = require('path');

module.exports = {
    //where application source code is 'inside app folder'
    context: __dirname + '/app',
    //the first file webpack will load the app itself and angular
    entry: {
        app: './app.js',
        vendor: ['angular']  
    },
    //outputs todo.bundle.js module into public/scripts file
    output: {
        path: __dirname + '/public/scripts',
        filename: 'todo.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};