var fs = require('fs')
var glob = require('glob')

var data = []

glob('meta/*.json', function (err, files) {
  if (err) throw err
  files.forEach(function (f) {
    var file = JSON.parse(fs.readFileSync(f))
    file.filename = f
    data.push(file)
  })
  
  fs.writeFileSync(__dirname + '/assets/data.json', JSON.stringify(data, null, '  '))
})