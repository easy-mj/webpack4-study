/**
 * 说明：babel只解析语法，只要语法符合规范就可以，它不管API在浏览器中是否支持
 */
// import '@babel/polyfill'
const sum = (m, n) => {
  return m + n
};

// 新的API，符合语法规范
Promise.resolve('hello').then(res => {
  console.log(res)
});

// 新的API，符合语法规范
['zhangsan', 'lisi', 'wangwu'].includes('lisi');