const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.js')
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackBaseConfig, {
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
    }),

    // 使用 ParallelUglifyPlugin 多进程并行压缩输出的JS代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyPlugin 的参数，还是使用 UglifyJS 压缩，只不过开启了多进程
      uglifyJS: {
        output: {
          beautify: false, // 最紧凑的输出
          comments: false, // 删除所有的注释
        },
        compress: {
          // 删除所有的 console 语句，可以兼容 IE 浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出来出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        }
      }
    })
  ]
})