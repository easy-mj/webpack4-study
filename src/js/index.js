import "../css/index.css";

function insertImg(file) {
  const img = new Image()
  img.src = file
  document.body.appendChild(img)
}

// 图片大小2.36kb
import icon from '../img/icon.png'
insertImg(icon)

import personImg from '../img/person.jpeg'
insertImg(personImg)
