const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base')
const { smart } = require('webpack-merge')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackBaseConfig, {
  mode: 'development',
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      path.join(srcPath, 'js', 'index')
    ]
  },
  module: {
    rules: [
      // 直接引入图片 url
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // 通过 window.APP_ENV 可以访问到该环境变量
      APP_ENV: JSON.stringify('developement')
    }),

    // 使用热更新插件
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8080,
    progress: true,  // 显示打包的进度条
    contentBase: distPath,  // 根目录(基于哪个目录访问文件)
    open: true,  // 自动打开浏览器
    compress: true,  // 启动 gzip 压缩
    hot: true, // 开启热更新

    // 设置代理(后端API服务需要支持跨域请求)
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/xxx
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
            '/api': ''
        }
      }
    }
  }
})