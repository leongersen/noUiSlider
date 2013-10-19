# noUiSlider

noUiSlider is lightweight plugin that was developed to be a jQuery UI alternative. It features cross-browser support, a `just-another-input-type` style of getting and setting values, a wide range of options and support for a bunch off touch devices. It works wonders on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets. It works excellent on the desktop too; All modern browsers and IE7+ are supported. The end result? A lean, extendible and bloat-less plugin that'll just do its job. To add even more flexibility, noUiSlider is compatible with both jQuery and Zepto.js. Oh, and the licensing terms are simple: [just do what you want](http://refreshless.com/nouislider/terms-of-use).

Documentation
-------

An extended documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](http://refreshless.com/nouislider/).

Changes
-------

**Changelog for version 4.2.2:**  
+ Changed implementation of pointerEvents to be compatible with IE11.

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
white: true
```

Please note that while some errors remain without these options, they are merely differences in coding style. Using `++` for example, is in my opinion very clear in a `for` loop. Some jQuery methods offer callbacks noUiSlider doesn't require, thus requiring `unparam`, and the `devel` option is required for the `console` statements.

Known issues
------------
There are some minor issues remaining in noUiSlider. It is a priority to fix these issues, but they may be fixed by browser changes in the future.

+ Firefox will prefer scrolling to dragging the slider on touch events. The `preventDefault()` call that prevents this in other browser seems to fail here.
+ Safari for windows has the same issue, but only on vertical scrolling.

