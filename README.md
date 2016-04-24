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
### 8.5.1 (latest)
- Fix: class mixup in 8.5.0 merge
- Change: position pips markers relatively

### 8.5.0
- Added: ability to completely override the classes used by the slider
- Fix: removed invalid stopPropagation loop
- Fix: source properly lints

### 8.4.0
- Fix: don't assume `window` exists. #503, #533, #617 and #628
- Fix: `:focus` style applied to wrong element. #631
- Fix: `step` option is lost on updating. #619
- Fix: exposed `options` should be the original options, not the parsed set. #607
- Added: handle animation time configurable. #629
- Added: slider values can be updated without firing `set`. #602
- Change: internal value calculations no longer limited to 7 decimals. #614

### 8.3.0
- Expose several internal features, including `options` and `pips`.
- Add a fifth argument to all events, containing the handle offsets.
- Fixed `margin: 0` throwing an error.
- Fixed `set` firing when calling `slider.noUiSlider.set` with a `null` value.
- Fix and clarify some examples

### 8.2.1
- Fixed #568 and #569

### 8.2.0
- Added 'start', 'end' and 'hover' events
- Added better tooltip formatting options
- Bugfixes, including an issue where a mouseup would be missed

### 8.1.0
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
- Lumia 930 (WP8.1, IE10 mobile)
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

You can use [polyfill.io](https://cdn.polyfill.io/v2/docs/) to easily do so:

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<!--[if lte IE 8]>
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
<![endif]-->
```

Version numbering
------------------------------
Version numbering follows the 'Semantic versioning' style.
You'll find an excellent documentation at [Semver.org](http://semver.org/).
