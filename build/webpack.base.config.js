/**
 * Created by Ysssssss on 19/4/15.
 */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const srcDir = path.resolve(__dirname, '../src');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]-[hash].js',
        publicPath: '/',
        chunkFilename: '[name].[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: srcDir,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.less$/,
                use: [{
                    loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'postcss-loader',
                }, {
                    loader: 'less-loader',
                    options: {
                        // modifyVars: {
                        //     'hack': `true; @import "${srcDir}/styles/utils/resetAntdTheme.less"`
                        // },
                        javascriptEnabled: true,
                    }
                }],
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                include: [srcDir],
                options: {
                    esModule: false,
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 2048
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
                loader: 'url-loader',
                include: [srcDir],
                options: {
                    limit: 1,
                    name: '[hash].[ext]',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js','.jsx','.scss','.less','.css'],
        alias: {
            '@': srcDir,
            '@pages': `${srcDir}/pages`,
            '@routes': `${srcDir}/routes`,
            '@components': `${srcDir}/components`,
            '@common': `${srcDir}/common`,
            '@utils': `${srcDir}/utils`,
            '@styles': `${srcDir}/styles`,
            '@assets': `${srcDir}/assets`,
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: 'index.html'
        }),
    ],
}