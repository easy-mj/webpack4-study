import "../css/index.css";
import { sum } from '../utils/math'
import _ from 'lodash'

console.log(sum(5, 6))
console.log(_.multiply(3, 4))
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
