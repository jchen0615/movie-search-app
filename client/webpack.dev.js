const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Development',
        }),
    ],
    devServer: {
      contentBase: './dist',
    },
})