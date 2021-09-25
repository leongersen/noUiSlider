var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [0, 100],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});

var sliderFit = document.getElementById('slider-fit');

noUiSlider.create(sliderFit, {
    start: [0, 100],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});

var roundSlider = document.getElementById('slider-round');

noUiSlider.create(roundSlider, {
    start: 50,
    connect: 'lower',
    range: {
        'min': 0,
        'max': 100
    }
});

var squareSlider = document.getElementById('slider-square');

noUiSlider.create(squareSlider, {
    start: 50,
    range: {
        'min': 0,
        'max': 100
    }
});
