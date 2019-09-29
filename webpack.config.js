var path = require('path');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
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
                        options: { limit: 40000}
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
        })
    ],
    devServer: {
        open: true,
        contentBase: path.join(__dirname, '.'),
        compress: true,
        port: 9000
        }
};