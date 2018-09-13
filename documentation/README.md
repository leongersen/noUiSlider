If you'd like to contribute to the noUiSlider documentation (yes please!), you can run it locally using PHP's built in web server:

Clone the project (for example, in `C:/Web`):

```git clone https://github.com/leongersen/noUiSlider nouislider```

In your root (e.g. `C:/Web`), start the server:

```php -S localhost:80 nouislider/documentation/_run/router.php```

You can now access the documentation at `http://localhost/nouislider/`.

The documentation uses noUiSlider from the `distribute` folder, so you can test any changes you've made to the main source in the documentation after running ` npm run build`.
