# noUiSlider
_Current version: 4.0.2_

noUiSlider is a super tiny jQuery plugin that allows you to create range sliders.  
It fully supports touch, and it is way(!) less bloated than the jQueryUI library.

A full documentation, including examples, is available on the [noUiSlider documentation page](http://refreshless.com/nouislider/).

Changes
-------

**Changelog for version 4.0.2:**  
_[current patch release]_
+ Fixed some minor CSS issues in the default theme
+ The slider will no longer force an arbitrary width or height
+ Changed source to comply to more JsLint suggestions
+ Removed compressed versions from the tracking system.  They'll still be produced and provided, but they'll only be bundled in the [Github Releases Feature](https://github.com/blog/1547-release-your-software).
+ Some very small changes to internal input testing

**Changelog for version 4:**  
_[current major release]_

+ Massive update overhauling the entire code style
+ Better styling possibilities
+ Brand new Flat theme
+ Windows Phone 8 support
+ Performance improvements
+ New way of handling disabled sliders
+ Internal option testing provides feedback on issues

Version numbering
------------------------------
Version numbering follows the 'Semantic versioning' style.  
You'll find an excellent documentation at [Semver.org](http://semver.org/).

Compression and Error checking
------------------------------
**CSS** ([CSSMinifier](http://cssminifier.com/))  
The stylesheet is trimmed of whitespace and comments to provide a `min` version.

**JS** ([Google Closure Compiler](http://closure-compiler.appspot.com/home))  
The plugin is compressed using the Google Closure compiler, using the 'simple' optimization option.  


**Code** ([JsLint](http://jslint.com/))  
The plugin code is checked using JsLint, with the following options:
```
browser: true
devel: true
plusplus: true
unparam: true
sloppy: true
white: true
```

Please note that while some errors remain without these options, they are merely differences in coding style. Using `++` for example, is in my opinion very clear in a `for` loop. Some jQuery methods offer callbacks noUiSlider doesn't require, thus requiring `unparam`, and the `devel` option is required for the `console` statements.  The `sloppy` option refers to a missing `"use strict"` statement, which isn't included for lack of testing.  

Known issues
------------
There are some minor issues remaining in noUiSlider 4. It is a priority to fix these issues.

+ Firefox will prefer scrolling to dragging the slider on touch events. The `preventDefault()` call that prevents this in other browser seems to fail here.
+ In IE10, tapping the slider to move it will fail in with these conditions:
    + The paged is zoomed;
	+ The slider uses the `orientation: vertical` option
	+ The page is scrolled, so that `scrollTop` > 0  
	This issue affects both IE10 in Windows 8 and Windows Phone 8.
