'use strict';

var sandbox = require('sandboxed-module');

var cssLoader = require('./css');

module.exports = function(window){
  cssLoader(window);
  return sandbox.require('./distribute/jquery.nouislider.all', {
    globals: {
      window: window,
      document: window.document
    }
  });
};
