var grid = require('hex-grid')

var hexes = document.querySelectorAll('.hex')
var root = document.querySelector('#grid')

var g
function scan () {
  g = grid({ element: root, spacing: 4 }, hexes)
}

scan()
window.addEventListener('resize', scan)
window.addEventListener('load', scan)
