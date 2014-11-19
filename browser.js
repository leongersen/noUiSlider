'use strict';

var cssLoader = require('./css');

module.exports = function () {
  cssLoader();
  return require('./distribute/jquery.nouislider.all');
};
