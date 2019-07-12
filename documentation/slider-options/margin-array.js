var marginSlider2 = document.getElementById('slider-margin2');

noUiSlider.create(marginSlider2, {
    start: [10, 50, 90],
    margin: [15, 30],
    tooltips: true,
    step: 1,
    range: {
        'min': 0,
        'max': 100
    }
});
