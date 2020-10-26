const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },

    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(jpg|png|jpeg|png)$/, use:[{loader:'url-loader', options:{esModule:false}}]},
            {exclude: /node_modules/}
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}