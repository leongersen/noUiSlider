'use strict';

var sandbox = require('sandboxed-module');

var cssLoader = require('./css');

var initializer = function(window){
  return sandbox.require('./distribute/jquery.nouislider.all', {
    globals: {
      window: window,
      document: window.document
    }
  });
};

initializer.css = cssLoader;

module.exports = initializer;
