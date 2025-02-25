import "../css/index.css";
import { sum } from './math'

const s = sum(2, 6)
console.log('计算结果为：', s)

// 开启热更新后的逻辑
if (module.hot) {
  // 只有在更改 math.js 文件的时候才会热更新，不刷新浏览器
  module.hot.accept(['./math.js'], () => {
    // 文件热更新之后的回调逻辑
    const s = sum(2, 6)
    console.log('计算结果为：', s)
  })
}