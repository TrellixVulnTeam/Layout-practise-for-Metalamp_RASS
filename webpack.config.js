const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        open: true,
        port: 4200,
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            minify: false,
            template: 'index.pug'
        }),
        new HTMLWebpackPlugin({
            filename: 'search-result.html',
            minify: false,
            template: 'search-result.pug'
        }),
        new HtmlWebpackPugPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    module: {
        rules: [{
                test: /\.(png|svg|jpg|jpeg|gif|ttf|woff|ico)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js.map$/,
                use: ["source-map-loader"],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            }
        ]
    }
}