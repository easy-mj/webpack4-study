const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  entry: {
    index: path.join(srcPath, 'js', 'index')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 开启缓存（第一次编译后会缓存，如果第二次没有改动的部分会使用缓存而不是重新编译）
        loader: ['babel-loader?cacheDirectory'],
        include: srcPath, // 明确查找范围（include 和 exclude选择其一即可）
        exclude: /node_modules/ // 排除查找范围
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      chunks: ['index']
    })
  ]
}