var jointTooltipSlider = document.getElementById('slider-joint-tooltips');

noUiSlider.create(jointTooltipSlider, {
    start: [20, 80, 120],
    tooltips: [wNumb({decimals: 1}), true],
    jointTooltips: true,
    range: {
        'min': 0,
        'max': 200
    }
});
