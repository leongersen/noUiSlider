'use strict';

var sandbox = require('sandboxed-module');

module.exports = function(window){
  return sandbox.require('insert-css', {
    globals: {
      document: window.document
    }
  });
};
