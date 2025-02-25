const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.js')
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackBaseConfig, {
  /**
   * 使用 production 模式
   * 1. 自动开启代码压缩，如果觉得uglifyJS压缩慢，可以借助ParallelUglifyPlugin来开启多进程压缩
   * 2. Vue React等会自动删掉调试代码（比如开发环境的warning等）
   * 3. 启动 Tree-Shaking，作用就是会删除没有用到的代码
   *   3.1 必须使用ES6 Module才能生效，因为ES6 Module是静态引用，编译时引入
   *   3.2 CommonJS是动态引入，是执行时引入
   *   3.3 只有 ES Module 才能实现静态分析，从而实现 Tree-Shaking
   */
  mode: 'production',
  output: {
    filename: '[name].[contentHash:8].js',
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