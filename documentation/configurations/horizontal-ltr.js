var slider = document.getElementById('horizontal-ltr');

noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    direction: "ltr",
    orientation: "horizontal",
    behaviour: "drag-range",
    range: {
        'min': 0,
        'max': 100
    }
});

document.querySelector('#horizontal-ltr .noUi-origin').setAttribute('disabled', 'disabled');
