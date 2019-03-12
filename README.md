# noUiSlider

noUiSlider is a lightweight JavaScript range slider.

- **No dependencies**
- All modern browsers and IE > 9 are supported
- Fully **responsive**
- **Multi-touch support** on Android, iOS and Windows devices
- Accessible with `aria` and keyboard support
- Tons of [examples](https://refreshless.com/nouislider/examples) and answered [Stack Overflow questions](https://stackoverflow.com/questions/tagged/nouislider)

License
-------
noUiSlider is licensed [MIT](https://choosealicense.com/licenses/mit/). You can use it **for free** and **without any attribution**, in any personal or commercial project.

[Documentation](https://refreshless.com/nouislider/)
-------
An extensive documentation, including **examples**, **options** and **configuration details**, is available here: [noUiSlider documentation](https://refreshless.com/nouislider/).

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

Testing
-------

Cross-browser testing kindly provided by BrowserStack.

[![Tested with BrowserStack](documentation/assets/browserstack-logo-600x315.png)](http://browserstack.com/)

Webpack
-------
In order to use this with webpack, the easiest way to work with it is by using the [`ProvidePlugin`](https://webpack.js.org/plugins/provide-plugin/):

```javascript
// webpack.config.js
var webpack = require('webpack');
...
plugins: [
	new webpack.ProvidePlugin({
		noUiSlider: 'nouislider'
	})
]
...
```

If you're using ES6 imports, a simple [import with side effect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Import_a_module_for_its_side_effects_only)
is enough:

```
import 'nouislider';
import 'nouislider/distribute/nouislider.css';
```
