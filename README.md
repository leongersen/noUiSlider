# noUiSlider

noUiSlider is lightweight plugin, developed to be a jQuery UI alternative. It features cross-browser support, a `just-another-input-type` style of getting and setting values, a wide range of options and support for a bunch of touch devices. It works wonders on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets. It works excellent on the desktop too; All modern browsers and IE7+ are supported. The end result? A lean, extendible and bloat-less plugin that'll just do its job. To add even more flexibility, noUiSlider is compatible with both jQuery and Zepto.js. Oh, and the licensing terms are simple: [just do what you want](http://www.wtfpl.net/about/).

Changelog
---------

noUiSlider is currently on version 7.0. This version contains significant changes from 6.2, improving various aspects and moving some features in their own module.
+ All serialization features are now supported by my new project, [libLink](http://refreshless.com/liblink/).
+ All number formatting features have been moved into the [wNumb formatting library](http://refreshless.com/wnumb/).
+ The val method now only takes values, as all additional options are now automaticly detected.
+ Documentation overhaul
+ Improved and restructured testing suite.
+ Performance improvements due to painting in another layer. (#268);
+ Minified file is now clearly marked (#320).
+ Added `limit` option to provide 'maximum margin' (#308).
+ Fixed rebuilding an uninitialized slider (#271).
+ Added generation of pips/range points (#254, #260).
+ Fixed `tap` ignoring `margin` (#265).


Documentation
-------
An extensive documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](http://refreshless.com/nouislider/).

Unit Testing
------------
Unit tests where overhauled for noUiSlider 7. Most code is now covered, with events testing being slightly lacking due to it's browser dependant nature.

Version numbering
------------------------------
Version numbering follows the 'Semantic versioning' style.
You'll find an excellent documentation at [Semver.org](http://semver.org/).

Compression and error checking
------------------------------
The plugin code is checked using ([JsLint](http://jslint.com/)). Any remaining errors and warnings are intentional.

The plugin is compressed using the ([Google Closure Compiler](http://closure-compiler.appspot.com/home)). The source was initialy adapted to facilitate the `ADVANCED_OPTIMIZATIONS` level, but the risks this poses regarding to unintented renaming proved problematic. On Windows, the BAT script in this repository can be used to run the compiler. On OS X or Linux enviroments, simply run the `java -jar` command from the command line.
