var pipsSlider = document.getElementById('slider-pips');

noUiSlider.create(pipsSlider, {
    range: {
        min: 0,
        max: 100
    },
    start: [50],
    pips: {mode: 'count', values: 5}
});
