function filterPips(value, type) {
    if (type === 0) {
        return value < 2000 ? -1 : 0;
    }
    return value % 1000 ? 2 : 1;
}

var pipsSteps = document.getElementById('pips-steps');

noUiSlider.create(pipsSteps, {
    range: range_all_sliders,
    start: 0,
    pips: {
        mode: 'steps',
        density: 3,
        filter: filterPips,
        format: wNumb({
            decimals: 2,
            prefix: '&euro;'
        })
    }
});
