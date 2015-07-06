/*jslint browser: true */
/*jslint white: true */

(function (factory) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if ( typeof exports === 'object' ) {

        var fs = require('fs');

        // Node/CommonJS
        module.exports = factory();
        module.exports.css = function () {
            return fs.readFileSync(__dirname + '/nouislider.min.css', 'utf8');
        };

    } else {

        // Browser globals
        window.noUiSlider = factory();
    }

}(function( ){

	'use strict';
