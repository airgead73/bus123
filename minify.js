const minify = require('@node-minify/core');
const gcc = require('@node-minify/google-closure-compiler');

minify({
  compressor: gcc,
  input: 'public/js/app.js',
  output: 'public/js/app-min.js',
  callback: function(err, min) {
    console.log('file minified');
  }
})