# noUiSlider

noUiSlider is lightweight JavaScript range slider, originally developed to be a jQuery UI alternative. It features cross-browser support, a wide range of options and support for a bunch of touch devices. It has been tested on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets and desktops; All modern browsers and IE9+ are supported. The end result? A lean, extendible and bloat-less plugin that'll just do its job.

The best part? noUiSlider has no dependencies! As of version 8, **Query is no longer required!**

Oh, and the licensing terms are simple: [just do what you want](http://www.wtfpl.net/about/).

Documentation
-------
An extensive documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](http://refreshless.com/nouislider/).

Changelog
---------
###8.0.2
Fix #464, added NPM information;

###8.0.1
Fixed an issue with IE11 on touch devices.

###8.0.0
Removed jQuery dependency! For more info and other changes, see [the release information](http://refreshless.com/nouislider/new-version).

Bower
-----
Bower users can install all compiled and minified files easily using `bower install nouislider --save`. Supporting bower unfortunately means keeping all compiled and minified versions in the repository.

NPM
---
Install noUiSlider using the [GitHub syntax](https://github.com/leongersen/noUiSlider/issues/433#issuecomment-118330780):
```npm install leongersen/noUiSlider```

Browserify
----------
This library is [UMD](https://github.com/umdjs/umd) compatible, so you can use it in this way:

```javascript
var noUiSlider = require('nouislider');

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: 40,
  connect: "lower",
  range: {
    min: 0,
    max: 100
  }
});
```

Version numbering
------------------------------
Version numbering follows the 'Semantic versioning' style.
You'll find an excellent documentation at [Semver.org](http://semver.org/).

Contributing
------------------------------
The plugin code can be managed using a Grunt-based task runner.
Use `npm install` to fetch all dependancies, then `grunt concat` to merge all files.
