# noUiSlider

noUiSlider is lightweight plugin, developed to be a jQuery UI alternative. It features cross-browser support, a `just-another-input-type` style of getting and setting values, a wide range of options and support for a bunch of touch devices. It works wonders on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets. It works excellent on the desktop too; All modern browsers and IE7+ are supported. The end result? A lean, extendible and bloat-less plugin that'll just do its job. To add even more flexibility, noUiSlider is compatible with both jQuery and Zepto.js. Oh, and the licensing terms are simple: [just do what you want](http://www.wtfpl.net/about/).

Documentation
-------
An extensive documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](http://refreshless.com/nouislider/).

Bower
-----
Bower users can install all compiled and minified files easily.

Run:
```
bower install https://github.com/leongersen/noUiSlider/releases/download/<<Current Version>>/noUiSlider.<<Current Version>>.zip
```

Or create a `bower.json` with the following dependency:
```
"noUiSlider": "https://github.com/leongersen/noUiSlider/releases/download/<<Current Version>>/noUiSlider.<<Current Version>>.zip"
```

You can read more about the absence of minified files in [this blog post](http://refreshless.com/blog/git-repository-commit-minified-bower/).

Changelog
---------
###7.0.4:
+ Removed minified files.
+ Added a direct release for Bower users.

###7.0.3:
+ Fixed an issue with Link on single-handle RTL sliders.
+ Added minified files for Bower users.
+ Version information in minified JS.

###7.0.2:
+ Fixed an issue with the handle `z-index`. (#333)
+ Added pips formatting. (#330)
+ Added Grunt-based tasks.

###7.x
noUiSlider is currently on version 7. This version contains significant changes from 6, improving various aspects and moving some features in their own module.
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

Unit Testing
------------
Unit tests where overhauled for noUiSlider 7. Most code is now covered, with events testing being slightly lacking due to it's browser dependant nature.

Version numbering
------------------------------
Version numbering follows the 'Semantic versioning' style.
You'll find an excellent documentation at [Semver.org](http://semver.org/).

Contributing
------------------------------
The plugin code can be managed using a Grunt-based task runner.
Use `npm install` to fetch all dependancies, then `grunt concat` to merge all files.
