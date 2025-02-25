const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  entry: {
    index: path.join(srcPath, 'js', 'index')
  },
  module: {
    /**
     * 独立完整的 [jquery|lodash].min.js 文件就没有采用模块化
     * 忽略对 [jquery|lodash].min.js 文件的递归解析处理
     */
    noParse: /jquery|lodash/, // 使用正则表达式匹配不需要解析的模块,
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/
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