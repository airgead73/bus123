const minify = require('@node-minify/core');
const gcc = require('@node-minify/google-closure-compiler');
const uglifyJS = require('@node-minify/uglify-js')

minify({
  compressor: uglifyJS,
  input: 'public/js/app.js',
  output: 'public/js/app-min.js',
  callback: function(err, min) {
    if(err) console.log(err.message);
    console.log('file minified');
  }
});