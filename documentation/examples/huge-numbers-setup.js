var bigValueSlider = document.getElementById('slider-huge');
var bigValueSpan = document.getElementById('huge-value');

noUiSlider.create(bigValueSlider, {
    start: 0,
    step: 1,
    format: wNumb({
        decimals: 0
    }),
    range: {
        min: 0,
        max: 13
    }
});
