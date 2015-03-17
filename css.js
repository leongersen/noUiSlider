'use strict';

var fs = require('fs');

var insertCssLoader = require('./3rd-party-loaders/insert-css');

module.exports = function (window) {
  var insertCss = insertCssLoader(window);
  insertCss(fs.readFileSync(__dirname + '/distribute/jquery.nouislider.min.css', 'utf8'));
};
