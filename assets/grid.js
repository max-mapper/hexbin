/* global $ */
var grid = require('hex-grid')

$.getJSON('assets/data.json', function (data) {
  var shuffled = shuffle(data)
  $.each(shuffled, function (key, val) {
    var img = $('<img />', {
      'class': 'hex',
      'src': val.raster,
      'alt': val.description,
    })

    $('<a />', {
      'href': "http://hexb.in/" + val.filename,
      'target': '_blank'
    }).append(img).appendTo('#grid')
  })

  var hexes = document.querySelectorAll('.hex')
  var root = document.querySelector('#grid')

  function scan () {
    grid({ element: root, spacing: 4 }, hexes)
  }

  scan()
  window.addEventListener('resize', scan)
  window.addEventListener('load', scan)
})

function shuffle (array) {
  var currentIndex = array.length
  var temporaryValue
  var randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
