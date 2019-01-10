var trueSlider = document.getElementById('slider-animate-true');
var falseSlider = document.getElementById('slider-animate-false');
var setButton = document.getElementById('set-sliders');

noUiSlider.create(trueSlider, {
    animate: true,
    animationDuration: 300,
    start: 20,
    range: {
        min: 0,
        max: 100
    }
});

noUiSlider.create(falseSlider, {
    animate: false,
    start: 20,
    range: {
        min: 0,
        max: 100
    }
});

setButton.addEventListener('click', function () {
    trueSlider.noUiSlider.set(60);
    falseSlider.noUiSlider.set(60);
});
