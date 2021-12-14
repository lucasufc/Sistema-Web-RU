const webpack = require('webpack')
const modoDev = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/scripts/index.js',
    output: {
        filename: 'app.js',
        path: __dirname + '/docs'
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin ({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new UglifyJsPlugin ({
            cache: true,
            parallel: true
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader', // interpreta @import, url()...
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use:['file-loader']
        }]
    }
}