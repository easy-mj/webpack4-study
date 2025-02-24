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