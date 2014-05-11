# noUiSlider

noUiSlider is lightweight plugin, developed to be a jQuery UI alternative. It features cross-browser support, a `just-another-input-type` style of getting and setting values, a wide range of options and support for a bunch of touch devices. It works wonders on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets. It works excellent on the desktop too; All modern browsers and IE7+ are supported. The end result? A lean, extendible and bloat-less plugin that'll just do its job. To add even more flexibility, noUiSlider is compatible with both jQuery and Zepto.js. Oh, and the licensing terms are simple: [just do what you want](http://www.wtfpl.net/about/).

Documentation
-------

An extensive documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](http://refreshless.com/nouislider/).

Changes
-------

**Changelog for version 6.2.0:**
*(Compatible with 6.0.0)*

+ Removed the previously added `.classVal` and replaced it with a lightweight solution.
+ Fixed a bug in non-linear stepping for RTL sliders. (#262)
+ Added checks for `min` and `max` in `range`. (#255)
+ Added the minified version in the source, so it can be managed with Bower. (#252)

**Changelog for version 6.0.0:**

**Please note:** noUiSlider 6 is a *major* revision, which means it isn't compatible with version 5. Your stylesheet will keep working, but the JavaScript API has changed, and your current implementation will no longer work.

+ Added optional **non-linear** ranges, including stepping.
+ Added new behaviour settings.
+ Added object-oriented serialization.
+ Change events to use jQuery's/Zepto's `.on` and `.off`.
+ Removed `block` event.

Unit Testing
------------
Unit tests where added with noUiSlider 6. Coverage of `$.Link` and value handling is near complete, but due to the sensitivity of events across browsers, event testing is a little lacking.

Version numbering
------------------------------
Version numbering follows the 'Semantic versioning' style.
You'll find an excellent documentation at [Semver.org](http://semver.org/).

Compression and Error checking
------------------------------
The plugin code is checked using ([JsLint](http://jslint.com/)). Any remaining errors and warnings are intentional.

The plugin is compressed using the ([Google Closure Compiler](http://closure-compiler.appspot.com/home)). The source was adapted to facilitate the `ADVANCED_OPTIMIZATIONS` level. `$.Link` is merged into the file. On Windows, the folling BAT script can be used to run the compiler. On OS X or Linux enviroments, simply run the `java -jar` command from the command line.

```bat
@echo off

:: Set all paths as variables
set "jquery=.\externs\jquery-1.8.js"
set "link=..\source\Link.js"
set "source=..\source\jquery.nouislider.js"
set "result=..\source\jquery.nouislider.min.js"

:: Remove the existing file so we can be sure a new one is generated.
if exist %result% (
	del %result%
)

echo "Removed %result%, ready."

PAUSE

java -jar .\compiler\compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --externs %jquery% --warning_level VERBOSE --js %link% --js %source% --js_output_file %result%

echo "Done."
PAUSE
```

Known issues
------------
There are some minor issues remaining in noUiSlider. It is a priority to fix these issues, but they may be fixed by browser updates in the future.

+ Firefox and Safari on Windows will emulate mouse-events on touch screens, but prefer scrolling to dragging the slider.
