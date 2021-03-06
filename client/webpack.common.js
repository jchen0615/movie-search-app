const path = require('path')

module.exports = {
    entry: './src/index.js',
    output:{
        publicPath:'/',
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
}
