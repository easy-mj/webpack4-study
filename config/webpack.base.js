const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');
const { srcPath, distPath } = require('./paths')

module.exports = {
  entry: {
    index: path.join(srcPath, 'js', 'index')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/
      },
      // 针对 css 文件处理，增加 'postcss-loader'，loader处理顺序从后向前
      {
        test: /\.css$/,
        loader: [
          'style-loader', 
          'css-loader',
          'postcss-loader'
        ]
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