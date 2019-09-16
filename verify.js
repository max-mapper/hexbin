var fs = require('fs');
var glob = require('glob');
var assert = require('assert');

var REQUIRED_FIELDS = ['name', 'author', 'license', 'vector', 'raster'];
var OPTIONAL_FIELDS = ['description', 'order_online_url']

glob('meta/*.json', function (err, files) {
  if (err) throw err
  files.forEach(function (f) {
    var file = JSON.parse(fs.readFileSync(f));
    var fields = Object.keys(file);
    REQUIRED_FIELDS.forEach(function (requiredField) {
      if(fields.indexOf(requiredField) === -1) {
        console.warn(`Warning: Missing required field ${requiredField} in ${f}`)
      }
      // assert.ok(fields.indexOf(requiredField) !== -1, `Missing required field ${requiredField} in ${f}`)
    })
    fields.forEach(function (field) {
      if (REQUIRED_FIELDS.indexOf(field) === -1) {
        if (OPTIONAL_FIELDS.indexOf(field) === -1) {
          console.warn(`Warning: ${field} is not a required or optional field: ${f}`)
        }
      }
    })
    if (file['name'].match(/[^a-z\d-]/) !== null) {
      console.warn(`Warning: Invalid 'name' field value '${file['name']}' in ${f}, only alphanumeric characters and hyphens are allowed`);
    }
    // assert.ok(fields['name'].match(/[^\w\d-]/) !== null, `Invalid 'name' field value '${fields['name']}' in ${f}, only alphanumeric characters and hyphens are allowed`)
  })
})
