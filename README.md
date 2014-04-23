# noUiSlider

noUiSlider is lightweight plugin, developed to be a jQuery UI alternative. It features cross-browser support, a `just-another-input-type` style of getting and setting values, a wide range of options and support for a bunch of touch devices. It works wonders on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets. It works excellent on the desktop too; All modern browsers and IE7+ are supported. The end result? A lean, extendible and bloat-less plugin that'll just do its job. To add even more flexibility, noUiSlider is compatible with both jQuery and Zepto.js. Oh, and the licensing terms are simple: [just do what you want](http://refreshless.com/nouislider/terms-of-use).

Documentation
-------

An extensive documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](http://refreshless.com/nouislider/).

Changes
-------

**Changelog for version 6.1.0:**
**Compatible with 6.0.0**

+ Split out value methods into [$.classVal](https://github.com/leongersen/classVal). This is **included** in the release download.
+ `$.noUiSlider.Link` is now an alias to `$.Link`. The Link functionality has been moved into a new file. (also in the download).
+ Several bug fixes.
+ Added `to` and `from` to [number formatting](http://refreshless.com/nouislider/number-formatting)

**Changelog for version 6.0.0:**

**Please note:** noUiSlider 6 is a *major* revision, which means it isn't compatible with version 5. Your stylesheet will keep working, but the JavaScript API has changed, and your current implementation will no longer work.

+ Added optional **non-linear** ranges, including stepping.
+ Added new behaviour settings.
+ Added object-oriented serialization.
+ Change events to use jQuery's/Zepto's `.on` and `.off`.
+ Removed `block` event.

Unit Testing
------------

Unit tests where added with noUiSlider 6. The event testing coverage isn't 100% yet, but coverage of the `Link` is extensive. More tests will be added eventually.

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
