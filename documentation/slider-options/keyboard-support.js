var keyboardSlider = document.getElementById('slider-keyboard');

noUiSlider.create(keyboardSlider, {
    start: [10, 90],
    keyboardSupport: false,
    range: {
        'min': 0,
        'max': 100
    }
});
