const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.js')
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackBaseConfig, {
  mode: 'production',
  output: {
    // 使用内容hash，只有文件内容发生改变才会生成新的hash，最大限度的命中缓存
    filename: '[name].[contentHash:8].js', // name即多入口时 entry 的 key 值
    path: distPath
  },
  module: {
    rules: [
      // 图片-考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
            loader: 'url-loader',
            options: {
                // 小于 50kb 的图片用 base64 格式产出
                // 否则，依然延用 file-loader 的形式，产出 url 格式
                limit: 50 * 1024,

                // 打包到 img 目录下
                outputPath: '/img',
            }
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // 通过 window.APP_ENV 可以访问到该环境变量
      APP_ENV: JSON.stringify('production')
    })
  ]
})