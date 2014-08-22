# noUiSlider

noUiSlider is lightweight plugin, developed to be a jQuery UI alternative. It features cross-browser support, a `just-another-input-type` style of getting and setting values, a wide range of options and support for a bunch of touch devices. It works wonders on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets. It works excellent on the desktop too; All modern browsers and IE7+ are supported. The end result? A lean, extendible and bloat-less plugin that'll just do its job. To add even more flexibility, noUiSlider is compatible with both jQuery and Zepto.js. Oh, and the licensing terms are simple: [just do what you want](http://www.wtfpl.net/about/).

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

Compression and Error checking
------------------------------
The plugin code is checked using ([JsLint](http://jslint.com/)). Any remaining errors and warnings are intentional.

The plugin is compressed using the ([Google Closure Compiler](http://closure-compiler.appspot.com/home)). The source was initialy adapted to facilitate the `ADVANCED_OPTIMIZATIONS` level, but the risks this poses regarding to unintented renaming proved problematic. On Windows, the BAT script in this repository can be used to run the compiler. On OS X or Linux enviroments, simply run the `java -jar` command from the command line.
