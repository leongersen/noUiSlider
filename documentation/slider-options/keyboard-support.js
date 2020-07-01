var keyboardSlider = document.getElementById('slider-keyboard');

noUiSlider.create(keyboardSlider, {
    start: [10, 90],
    keyboardSupport: true, // Default true
    keyboardPageMultiplier: 10, // Default 5
    keyboardDefaultStep: 5, // Default 10
    range: {
        'min': 0,
        'max': 100
    }
});
