/**
 * Created by Ysssssss on 19/4/15.
 */
const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config.js')
const merge = require('webpack-merge');

const config = merge(baseConfig, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'BACKEND': '"https://pos.dev.luedongtech.com"',
            }
        }),
    ],
})

module.exports = config