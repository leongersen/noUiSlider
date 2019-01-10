var pipsCountStepped = document.getElementById('pips-count-stepped');

noUiSlider.create(pipsCountStepped, {
    range: range_all_sliders,
    start: 0,
    pips: {
        mode: 'count',
        values: 6,
        density: 4,
        stepped: true
    }
});
