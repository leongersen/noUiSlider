var slider = document.getElementById('slider-exact-input');

noUiSlider.create(slider, {
    start: 3000,
    exactInput: true,
    range: {
        'min': [0, 1000],
        'max': [10000]
    },
    tooltips: true
});

// (#436)