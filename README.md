# noUiSlider

noUiSlider is lightweight JavaScript range slider.

- **No dependencies**
- All modern browsers and [IE9+](#browser-support) are supported
- Fully **responsive**
- **Touch support** on Android, iOS and Windows devices
- Tons of [examples](https://refreshless.com/nouislider/examples) and answered [Stack Overflow questions](https://stackoverflow.com/questions/tagged/nouislider)

License
-------
noUiSlider is licensed [WTFPL](http://www.wtfpl.net/about/). You can use it **for free** and **without any attribution**, in any personal or commercial project. You may also fork the project and re-release it under another license you prefer.

Documentation
-------
An extensive documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](https://refreshless.com/nouislider/).

Bower
-----
`bower install nouislider --save`

npm [(package)](https://www.npmjs.com/package/nouislider)
---
`npm install nouislider --save`

Changelog
---------

### 10.0.0 (*2017-05-28*)
- Change: Change event listeners to be passive (#785);
- Fixed: Pips are now updated when calling `updateOptions` (#669);
- Fixed: Content Security Policy issue with pips;
- Added: `removePips` method;
- Added: aria support (#685);
- Added: `ariaFormat` option (controls `aria-valuetext`); 
- Fixed: throw a better error when mistakenly trying to initialize noUiSlider with `null` (#658);
- Fixed: Made order of events consistent and documented it (#775);
- Fixed: Border radius of connect bar, white space wrapping of tooltips (#773, #774);
- Fixed: Slider now uses `ownerDocument` instead of `document` (#767);

### 9.2.0 (*2017-01-17*)
- Added: Version number to exceptions;
- Added: `noUiSlider.version` holds current version number;
- Added: Throw exception on invalid `pips` configuration (#721);
- Added: Merged pull request that uses less preprocessor to generate CSS (#735);

### 9.1.0 (*2016-12-10*)
- Fixed: Slider not properly handling multitouch (#700, #704);
- Fixed: Removed a querySelector for the currently active handle (#720);
- Fixed: Removed iOS/webkit flashes on tap;
- Fixed: Incorrect error when using margin/limit with a step smaller than 0 (#736);
- Fixed: Drag option using incorrect cursor arrows (#681);
- Added: New `padding` option (#711);
- Added: Re-introduced `.noUi-handle-lower` and `.noUi-handle-upper` classes removed in 9.0.0;
- Added: Compatibility for legacy `connect` options removed in 9.0.0;

### 9.0.0 (*2016-09-26*)
- Added: Support for **more than 2 handles**;
- Added: `format` option can be updated (#641);
- Added: `reset` method the return slider to start values (#673);
- Change: `connect` option is now implemented as a separate node;
- Change: all event arguments, including the handle number, are now in slider order;
- Change: `updateOptions` now **modifies the original options** object. The reference in `slider.noUiSlider.options` remains up to date (#678);
- Change: more events fire when using various `behaviour` options (#664);
- Change: on `rtl` sliders, handles are now visually positioned from the sliders `right`/`bottom` edge;
- Change: events for `rtl` sliders now fire in the same order as for `ltr` sliders (with incremental handleNumbers);
- Change: internal `Spectrum` component is no longer `direction` aware;
- Change: `limit` and `margin` must be divisible by `step` (if set);
- Removed: `.noUi-stacking` class. Handles now stack themselves;
- ~~Removed~~ (returned in 9.1.0): `.noUi-handle-lower` and `.noUi-handle-upper` classes;
- Removed: `.noUi-background`. Use `.noUi-target` instead;
- ~~Removed~~ (backward compatibility in 9.1.0): `connect: 'lower'` and `connect: 'upper'`. These settings are replaced by `connect: [true, false]`;
- Fixed: default tooltip color (#687);
- Fixed: `margin` and `limit` calculated improperly after calling `updateOptions` with a new `range` option;
- Fixed: `range` option was required in update, even when not updating it (#682);
- Fixed: Cursor styling is now consistent for disabled handles and sliders (#644);
- Fixed: Sliders now ignore touches when the screen is touched multiple times (#649, #663, #668);

Devices
-------
Devices/browsers tested:
- Surface Pro 3 (Windows 10)
- iPad Air 2 (iOS 9.3)
- iPad 3 (iOS 8.4)
- Moto E (Android 5.1, Chrome)
- Lumia 930 (WP8.1, IE10 mobile)
- Lumia 930 (WM10, Edge)
- OnePlus 3 (Android 6)
	+ Chrome
	+ Firefox
- Asus S400C (Windows 10, Touch + mouse)
	+ Chrome
	+ Firefox
	+ Edge
	+ IE11
	+ IE10 (Emulated)
	+ IE9 (Emulated)

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
