var pipsRange = document.getElementById('pips-range');
var pipsRangeRtl = document.getElementById('pips-range-rtl');
var pipsRangeVertical = document.getElementById('pips-range-vertical');
var pipsRangeVerticalRtl = document.getElementById('pips-range-vertical-rtl');

noUiSlider.create(pipsRange, {
    range: range_all_sliders,
    start: 0,
    pips: {
        mode: 'range',
        density: 3
    }
});

noUiSlider.create(pipsRangeRtl, {
    range: range_all_sliders,
    start: 0,
    direction: 'rtl',
    pips: {
        mode: 'range',
        density: 3
    }
});

noUiSlider.create(pipsRangeVertical, {
    range: range_all_sliders,
    start: 0,
    orientation: 'vertical',
    pips: {
        mode: 'range',
        density: 3
    }
});

noUiSlider.create(pipsRangeVerticalRtl, {
    range: range_all_sliders,
    start: 0,
    orientation: 'vertical',
    direction: 'rtl',
    pips: {
        mode: 'range',
        density: 3
    }
});
