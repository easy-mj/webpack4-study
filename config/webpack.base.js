const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  entry: {
    index: path.join(srcPath, 'js', 'index'),
    about: path.join(srcPath, 'js', 'about')
  },
  module: {
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
    // 多入口 -> 生成 index.html 页面
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      // 表示该页面要引用哪些 chunk（也就是上面的 index 和 about），默认全部引入
      chunks: ['index'] // 只引用 index.js
    }),

    // 多入口 -> 生成 about.html 页面
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'about.html'),
      filename: 'about.html',
      // 表示该页面要引用哪些 chunk（也就是上面的 index 和 about），默认全部引入
      chunks: ['about'] // 只引用 about.js
    })
  ]
}