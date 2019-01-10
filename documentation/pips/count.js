var pipsCount = document.getElementById('pips-count');

noUiSlider.create(pipsCount, {
    range: range_all_sliders,
    start: 0,
    pips: {
        mode: 'count',
        values: 6,
        density: 4
    }
});
