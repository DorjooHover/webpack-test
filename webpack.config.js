const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack')
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: ['./main.js', './main.scss', './img/stones.png'],
    output: {
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [{
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /.(scss|css)$/,
                exclude: /node_modules/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            }, {
                test: /\.(jpeg|svg|gif|jpg|png)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "img",
                        publicPath: "img",
                        emitFile: true,
                        esModule: false
                    }
                }, ],
            }, {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    variable: 'data',
                    interpolate: '\\{\\{(.+?)\\}\\}',
                    evaluate: '\\[\\[(.+?)\\]\\]'
                }
            }
        ]
    },
    plugins: [
        new MinifyPlugin({}, {
            comments: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}