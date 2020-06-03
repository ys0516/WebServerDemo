/**
 * Created by Ysssssss on 19/4/15.
 */
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');
const devMode = process.env.NODE_ENV !== 'production';

const config = merge(baseConfig, {
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            chunkFilename: "chunk/[id].[contenthash:8].css"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'BACKEND': devMode ? '"https://pos.dev.luedongtech.com"' : '"https://pos.3000kr.cn:8080"',
            }
        }),
    ],
    optimization: {
        // 打包压缩js/css文件
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    },
                    output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false,
                    }
                }
            }),
        ],
    },
})

module.exports = config