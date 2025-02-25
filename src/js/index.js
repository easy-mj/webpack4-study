import "../css/index.css";

function insertImg(file) {
  const img = new Image()
  img.src = file
  document.body.appendChild(img)
}

import computeImg from '../img/compute.png'
insertImg(computeImg)
import personImg from '../img/person.jpeg'
insertImg(personImg)

var msg = () => {
  console.log('hello world')
}
msg()

// 引入动态数据，通过 import 函数实现懒加载
setTimeout(() => {
  import('./big-data.js').then(res => {
    console.log(res.default.info)
  })
}, 2000)
