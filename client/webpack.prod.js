const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Production',
          template: './src/index.html'
        }),
    ]
})