# noUiSlider
_Current version: 2.5_

noUiSlider is a little jQuery plugin that allows you to create range sliders.
It fully supports touch, and it is way(!) less bloated than the jQueryUI library.

A full documentation, including examples, is available on the [noUiSlider documentation page](http://refreshless.com/nouislider/).

**Changelog for version 2.5.4:**
_[latest minor release]_

* Fixed issue #27.
* Added -webkit- touch specific statements to default stylesheet.

**Changelog for version 2.5.3:**
_[previous minor release]_

* Renamed `knob` and `knobs` to `handle` and `handles`. This change is backwards compatible, and completes the cleanup of noUiSlider option names.
* Fixed default stylesheet for use with `box-sizing: border-box;`

**Changelog for version 2.5:**
_[last major release]_

* Rewrote and resegmented code, resulting in better compressability and maintainability
* Fixed `step` to be reliable.
* Fixed `clickmove` to obide `step` option.
* Changed touch support to bind native events instead of translating them.
* Improved stylesheet to no longer require `!important` statements.
* Updated noUiSlider examples page with some code improvements.
