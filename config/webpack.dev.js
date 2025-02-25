const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base')
const { smart } = require('webpack-merge')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackBaseConfig, {
  mode: 'development',
  resolve: {
    // 针对Npm中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
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
    // 开启 Scope Hosting
    new ModuleConcatenationPlugin()
  ],
  devServer: {
    port: 8080,
    progress: true,  // 显示打包的进度条
    contentBase: distPath,  // 根目录(基于哪个目录访问文件)
    open: true,  // 自动打开浏览器
    compress: true,  // 启动 gzip 压缩

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