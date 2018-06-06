(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"hex-grid":3}],2:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],3:[function(require,module,exports){
var inside = require('point-in-polygon');
var defined = require('defined');

module.exports = function (opts, hexes) {
    var rsize = dims(opts);
    var hsize = dims(isharray(hexes) ? hexes[0] : hexes);
    if (!isharray(hexes)) {
        var h = hexes;
        hexes = [];
        for (var i = 0; i < h.n; i++) hexes.push(h);
    }
    var spacing = defined(opts.spacing, 0);
    var offset = opts.offset;
    if (!offset && opts.element) {
        offset = {
            x: opts.element.offsetLeft,
            y: opts.element.offsetTop
        };
    }
    if (!offset) {
        offset = {
            x: defined(opts.offsetLeft, 0),
            y: defined(opts.offsetTop, 0)
        };
    }
    var initRow = defined(opts.initRow, 0);
    initRow = parseInt(initRow, 10);
    if (initRow > 1) initRow = 1;
    if (initRow < 0) initRow = 0;

    var x = (initRow === 1) ? (hsize.width / 2) + (spacing / 2) : 0;
    var y = 0;
    var row = initRow;
    var results = [], points = [];
    for (var i = 0; i < hexes.length; i++) {
        var hex = hexes[i];
        if (hex.style) {
            hex.style.position = 'absolute';
            hex.style.left = x;
            hex.style.top = y;
        }
        results.push({ x: x, y: y });

        var hw = hsize.width / 2, hh = hsize.height / 2;
        var cx = x + hw, cy = y + hh;
        var pts = [
            [ cx, cy - hh ],
            [ cx + hw, cy - hh / 2 ],
            [ cx + hw, cy + hh / 2 ],
            [ cx, cy + hh ],
            [ cx - hw, cy + hh / 2 ],
            [ cx - hw, cy - hh / 2 ]
        ];
        points.push(pts);

        x += hsize.width + spacing;
        if (x > rsize.width - hsize.width) {
            y += Math.floor(hsize.height * 3/4) + spacing;
            row ++;
            x = (row % 2 ? (hsize.width / 2) + (spacing / 2) : 0);
        }
    }
    var res = {
        grid: results,
        points: points,
        lookupIndex: function (x, y) {
            var pt = [ x - offset.x, y - offset.y ];
            for (var i = 0; i < points.length; i++) {
                if (inside(pt, points[i])) return i;
            }
            return -1;
        },
        lookup: function (x, y) {
            var i = res.lookupIndex(x, y);
            return i >= 0 ? hexes[i] : undefined;
        }
    };
    return res;
};

function dims (opts) {
    var s = opts;
    if (opts.width || opts.height) {
        s = opts;
    }
    else if (opts.element) {
        s = window.getComputedStyle(opts.element);
    }
    else if (typeof window !== 'undefined' && window.getComputedStyle) {
        s = window.getComputedStyle(opts);
    }
    return {
        width: parseInt(s.width),
        height: parseInt(s.height)
    };
}

function isharray (xs) {
    return xs && typeof xs === 'object' && typeof xs.length === 'number';
}

},{"defined":2,"point-in-polygon":4}],4:[function(require,module,exports){
module.exports = function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

},{}]},{},[1]);
