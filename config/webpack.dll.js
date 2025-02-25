const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  mode: 'production',
  entry: {
    // 把 react 相关的模块放入一个单独的动态链接库
    react: ['react', 'react-dom']
  },
  output: {
    // [name]代表当前输出的动态链接库文件名称，对应 entry 的 key 值
    filename: '[name].dll.js',
    // 输出文件都存放到 dist 目录下
    path: distPath,
    // 动态链接库的全局名称，要防止全局变量冲突
    library: '__dll__[name]' // 输出的就是 __dll__react
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 动态链接库的全局变量名称，需要与output.library的值保持一致
      name: '__dll__[name]',
      // 描述动态链接库的 manifest.json 文件名称
      path: path.join(distPath, '[name].manifest.json')
    })
  ]
}