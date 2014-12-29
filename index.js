'use strict';

var sandbox = require('sandboxed-module');

module.exports = function(window){
  return sandbox.require('./distribute/jquery.nouislider.all', {
    globals: {
      window: window,
      document: window.document
    }
  });
};
