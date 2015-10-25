# noUiSlider

noUiSlider is lightweight JavaScript range slider, originally developed to be a jQuery UI alternative.

It features cross-browser support, a wide range of options and support for a bunch of touch devices. It has been tested on Android phones, iPhone & iPad, Windows phone and touch-screen laptops and tablets and desktops.

All modern browsers and [IE8+](#browser-support) are supported. The end result? A lean, extendible and bloat-less plugin that'll just do its job.

The best part? noUiSlider has no dependencies! As of version 8, **jQuery is no longer required!**

Oh, and the licensing terms are simple: [just Do What the Fuck You Want](http://www.wtfpl.net/about/) with it.

Documentation
-------
An extensive documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](http://refreshless.com/nouislider/).

Changelog
---------
### 8.1.0 (latest)
- Fixed Microsoft Edge support
- Merged several pull requests containing bug fixes
- Fixed an issue where a slider handle could get 'stuck' to a mouse cursor after moving out of a window.
- Combed through code using a profiler, fixed some performance issues.
- Added support for basic tooltips.

### 8.0.0
Removed jQuery dependency! For more info and other changes, see [the release information](http://refreshless.com/nouislider/new-version).

Devices
-------

Devices/browsers tested:
- Surface Pro 3 (Windows 10)
- iPad Air 2 (iOS 9.0)
- iPad 3 (iOS 8.4)
- Moto E (Android 5.1, Chrome)
- Asus S400C (Windows 10, Touch + mouse)
	+ Chrome
	+ Firefox
	+ Edge
	+ IE11
	+ IE10 (Emulated)
	+ IE9 (Emulated)

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

Browser support
---------------

All major browsers are supported. **To support IE8** you'll need to shim several ES5 features. 
[shawnbot/aight](https://github.com/shawnbot/aight) is a project aiming at providing the necessary missing features of ES5/DOM to IE8.

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<!--[if lte IE 8]>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aight/1.2.2/aight.min.js"></script>
<![endif]-->
```

Version numbering
------------------------------
Version numbering follows the 'Semantic versioning' style.
You'll find an excellent documentation at [Semver.org](http://semver.org/).
