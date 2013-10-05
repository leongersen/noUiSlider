# noUiSlider

noUiSlider is lightweight plugin that was developed to be a jQuery UI alternative. It features cross-browser support, a `just-another-input-type` style of getting and setting values, a wide range of options and support for a bunch off touch devices. It works wonders on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets. The end result? A lean, extendible and bloat-less plugin that'll just do its job. Oh, and the licensing terms are simple: [just do what you want](http://refreshless.com/nouislider/terms-of-use).

A full documentation, including examples, is available on the [noUiSlider documentation page](http://refreshless.com/nouislider/).

Changes
-------

**Changelog for version 4.1.0:**  
+ Added a new option to 'serialization' to set a decimal separator: 'mark'.
+ Added a much requested 'slide' callback to cover the gap between change and slide.
+ Fixed a long standing scrolling issue in IE10.
+ Several minor bugfixes.

**Changelog for version 4.0.3:**  
+ Missed a file while updating to 4.0.2.

**Changelog for version 4.0.2:**  
+ Fixed some minor CSS issues in the default theme
+ The slider will no longer force an arbitrary width or height
+ Changed source to comply to more JsLint suggestions
+ Removed compressed versions from the tracking system.  They'll still be produced and provided, but they'll only be bundled in the [Github Releases Feature](https://github.com/blog/1547-release-your-software).
+ Some very small changes to internal input testing

**Changelog for version 4:**  
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
There are some minor issues remaining in noUiSlider 4.1. It is a priority to fix these issues.

+ Firefox will prefer scrolling to dragging the slider on touch events. The `preventDefault()` call that prevents this in other browser seems to fail here.
+ Safari for windows has the same issue, but only on vertical scrolling.

