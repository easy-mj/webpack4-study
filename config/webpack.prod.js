const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.js')
const { smart } = require('webpack-merge')
const HappyPack = require('happypack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackBaseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contentHash:8].js',
    path: distPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 将 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例(见下面的插件配置)来处理
        use: ['happypack/loader?id=babel'],
        include: srcPath,
        // exclude: /node_modules/
      },
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
    }),

    // HappyPack 开启多进程打包
    new HappyPack({
      // 用唯一的标识符id来限定当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 loader 中的配置是一样的
      loaders: ['babel-loader?cacheDirectory']
    })
  ]
})