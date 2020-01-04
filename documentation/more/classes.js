noUiSlider.create(slider, {
    start: 80,
    range: {
        min: 0,
        max: 100
    },
    cssPrefix: 'noUi-', // defaults to 'noUi-',
    cssClasses: {
        // Full list of classnames to override.
        // Does NOT extend the default classes.
        // Have a look at the source for the full, current list:
        // https://github.com/leongersen/noUiSlider/blob/master/src/nouislider.js#L880
    }
});
