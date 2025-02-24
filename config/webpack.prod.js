const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.js')
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackBaseConfig, {
  mode: 'production',
  output: {
    // [name]: 多入口打包时必须这样写成动态获取值，对应就是entry的 key 值
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
  ],
  optimization: {
    // 分割代码块
    splitChunks: {
      /**
       * 三个取值：
       *  all: 全部 chunk
       *  initial: 入口 chunk，对于异步导入的文件不处理
       *  async: 异步 chunk，只对异步导入的文件处理
       */
      chunks: 'all',
      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 的名称
          priority: 1, // 优先级越高，优先抽离，很重要！！！
          test: /node_modules/, // 命中规则，第三方模块通常存放于node_modules目录
          minSize: 5 * 1024, // 大小限制5kb，大于5kb才抽离
          minChunks: 1  // 最少复用过几次（只要引用过1次就抽离）
        },

        // 公共的模块
        common: {
          name: 'common', // chunk 的名称
          priority: 0, // 优先级
          minSize: 0,  // 公共模块的大小限制（无论多大都抽离）
          minChunks: 2  // 公共模块最少复用过几次（引用过2次及以上才抽离）
        }
      }
    }
  }
})