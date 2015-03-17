'use strict';

var cssLoader = require('./css');

var initializer = function () {
  return require('./distribute/jquery.nouislider.all');
};

initializer.css = cssLoader;

module.exports = initializer;
