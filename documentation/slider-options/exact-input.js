var rangeSlider = document.getElementById('slider-exact-input');

noUiSlider.create(rangeSlider, {
    start: 3000,
    exactInput: true,
    range: {
        'min': [0, 1000],
        'max': [10000]
    },
    tooltips: true
});

// (#436)