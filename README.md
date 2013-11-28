# noUiSlider

noUiSlider is lightweight plugin, developed to be a jQuery UI alternative. It features cross-browser support, a `just-another-input-type` style of getting and setting values, a wide range of options and support for a bunch of touch devices. It works wonders on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets. It works excellent on the desktop too; All modern browsers and IE7+ are supported. The end result? A lean, extendible and bloat-less plugin that'll just do its job. To add even more flexibility, noUiSlider is compatible with both jQuery and Zepto.js. Oh, and the licensing terms are simple: [just do what you want](http://refreshless.com/nouislider/terms-of-use).

Documentation
-------

An extensive documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](http://refreshless.com/nouislider/).

Changes
-------

**Changelog for version 5.0.0:**

**Please note:** noUiSlider 5 is a *major* revision, which means it isn't 100% compatible with version 4. The Javascript API is **compatible**, but your **stylesheet might break**.

+ Added support for dragging the slider range.
+ Added option to disable 'tap'.
+ Added `extend` settings, which allows for designs where the handles fit within the slider bar.
+ Added `rebuild` method.
+ Brand new design, improved class structure.
+ Compatibility with Google Closure compiler in Advanced mode.

Version numbering
------------------------------
Version numbering follows the 'Semantic versioning' style.  
You'll find an excellent documentation at [Semver.org](http://semver.org/).

Compression and Error checking
------------------------------
**CSS** ([CSSMinifier](http://cssminifier.com/))  
The stylesheet is trimmed to remove whitespace and comments to provide a `min` version.

**JS** ([Google Closure Compiler](http://closure-compiler.appspot.com/home))  
The plugin is compressed using the Google Closure compiler. The source was adapted to facilitate the `ADVANCED_OPTIMIZATIONS` level.

**Code** ([JsLint](http://jslint.com/))  
The plugin code is checked using JsLint. Any remaining errors and warnings are intentional.

Known issues
------------
There are some minor issues remaining in noUiSlider. It is a priority to fix these issues, but they may be fixed by browser updates in the future.

+ Firefox and Safari on Windows will emulate mouse-events on touch screens, but prefer scrolling to dragging the slider.
