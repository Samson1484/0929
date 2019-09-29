var path = require('path');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 400000}
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: { byPassOnDebeg: true}
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,   // /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
/*
                use: [
                    {
                        loader: 'ss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
*/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new SpritesmithPlugin(
            {
                src:{
                    cwd: path.resolve(__dirname, 'src/sprite'),
                    glob: '**/*.png'
                },
                target: {
                    image: path.resolve(__dirname, 'src/images/sprite.png'),
                    css: path.resolve(__dirname, 'src/styles/_sprites.scss')
                },
                apiOptions: {
                    cssImageRef: "../images/sprite.png"
                }
            }
        )
    ],
    devServer: {
        open: true,
        contentBase: path.join(__dirname, '.'),
        compress: true,
        port: 9000
        }
};