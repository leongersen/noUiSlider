If you'd like to contribute to the noUiSlider documentation (yes please!), you can run it locally:

On any apache+php setup, clone the project (for example, in the root):

```git clone https://github.com/leongersen/noUiSlider```

Add a `.htaccess` file to send requests to the documentation:

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} ^/nouislider
RewriteRule ^.+$ noUiSlider/documentation/_run/router.php [L]
```

You can access the documentation at `http://localhost/nouislider/`.

The documentation uses noUiSlider from the `distribute` folder, so you can test any changes you've made to the main source in the documentation after running `grunt`.
