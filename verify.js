var fs = require('fs')
var glob = require('glob')

var REQUIRED_FIELDS = ['name', 'author', 'license', 'vector', 'raster']
var OPTIONAL_FIELDS = ['description', 'order_online_url']

glob('meta/*.json', function (err, files) {
  if (err) throw err
  files.forEach(function (f) {
    var file = JSON.parse(fs.readFileSync(f))
    var fields = Object.keys(file)

    /**
     * Rule: all required fields must be defined
     */
    REQUIRED_FIELDS.forEach(function (requiredField) {
      if (fields.indexOf(requiredField) === -1) {
        console.warn(`Warning: ${f}: Missing required field ${requiredField}`)
      }
      // FIXME: Some entries lack required fields (particularly `vector`)
    })

    /**
     * Rule: only required and optional fields may appear
     */
    fields.forEach(function (field) {
      if (REQUIRED_FIELDS.indexOf(field) === -1) {
        if (OPTIONAL_FIELDS.indexOf(field) === -1) {
          console.warn(`Warning: ${f}: ${field} is not a required or optional field.`)
          // FIXME: Some entries have extra fields (particularly `filename`)
        }
      }
    })

    /**
     * Rule: `name` must be a slug: lowercase alphanumeric plus hyphen only
     */
    if (file['name'].match(/[^a-z\d-]/) !== null) {
      var properSlug = file['name'].toLowerCase().replace(/[^a-z\d-]+/g, '-')
      console.warn(`Warning: ${f}: Invalid 'name' field value '${file['name']}', only alphanumeric characters and hyphens are allowed. Suggested value: '${properSlug}'`)
      // FIXME: Many entries have improper `name` fields.
    }

    /**
     * Rule: `vector` and `raster` images should exist and be relative to `hexb.in`
     * FIXME: Maybe make this hosting-neutral
     * FIXME: Vectors are missing, some are invalid.
     */
    // 'http://hexb.in/hexagons/' == 24 characters
    // 'http://hexb.in/vector/' == 22 characters
    // 'http://hexb.in/' == 15 characters
    var rasterUrl = file.raster ? file.raster.slice(0, 24) : ''
    var vectorUrl = file.vector ? file.vector.slice(0, 22) : ''
    var rasterPath = file.raster ? file.raster.slice(15) : ''
    var vectorPath = file.vector ? file.vector.slice(15) : ''
    if (rasterUrl !== 'http://hexb.in/hexagons/') {
      console.warn(`Warning: ${f}: 'raster' image '${file.raster}' must begin with 'http://hexb.in/hexagons/'`)
    }
    try {
      fs.statSync(rasterPath)
    } catch (e) {
      console.warn(`Warning: ${f}: Couldn't find raster image at '${rasterPath}': ${e}`)
    }
    if (vectorUrl !== 'http://hexb.in/vector/') {
      console.warn(`Warning: ${f}: 'vector' image '${file.vector}' must begin with 'http://hexb.in/vector/'`)
    }
    try {
      fs.statSync(vectorPath)
    } catch (e) {
      console.warn(`Warning: ${f}: Couldn't find vector image at '${vectorPath}': ${e}`)
    }
  })
})
