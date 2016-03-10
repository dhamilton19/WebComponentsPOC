const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: './example/app.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
        loaders: [
            {
                test: /(\.js)$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            },
            { test: /\.css$/, loader: "css-loader" },
            { test: /\.html$/, loader: "html-loader" },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    postcss: [autoprefixer],
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};