If you'd like to contribute to the noUiSlider documentation (yes please!), you can run it locally using PHP's built in web server.

Note that this requires PHP to be installed on your system.

Clone the project (for example, in `C:/Web`):

```git clone https://github.com/leongersen/noUiSlider nouislider```

You can now run the following shorthand to start the server:

```
npm run docs
```

You can now access the documentation at `http://localhost:8080/nouislider/`.

Alternatively, in your root (e.g. `C:/Web`), start the server:

```php -S localhost:8080 nouislider/documentation/_run/router.php```

The documentation uses noUiSlider from the `dist` folder, so you can test any changes you've made to the main source in the documentation after running `npm run build`.
