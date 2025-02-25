const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackBaseConfig, {
  mode: 'development',
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
    })
  ],
  // 开启监听，默认是 false，注意开启监听后，webpack-dev-server会自动开启刷新浏览器（webpack-dev-server已经默认开启）
  watch: true,
  // 监听配置
  watchOptions: {
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    aggregateTimeout: 300, // 默认为300ms
    // 判断文件是否发生变化时通过不停的去询问系统指定文件有没有变化实现的
    poll: 1000 * 5 // 默认每隔1000ms询问一次
  },
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