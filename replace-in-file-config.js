/**
 * The default output for Typescripts UMD export does not match the pattern previously used in noUiSlider.
 * For now, to switch to typescript without a backwards compatibility break, replace the module wrapper.
 *
 * @see https://github.com/microsoft/TypeScript/issues/8436
 */

const umdBefore = `(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noUiSlider = void 0;`;

const umdAfter = `(function(factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        window.noUiSlider = factory();
    }
})(function() {
    "use strict";`;

module.exports = {
    files: 'distribute/nouislider.js',
    from: [
        '%%REPLACE_THIS_WITH_VERSION%%',
        'exports.noUiSlider = {',
        umdBefore
    ],
    to: [
        process.env.npm_package_version,
        'return {',
        umdAfter
    ]
};
