var eTrue = document.getElementById('slider-animate-true'),
	eFalse = document.getElementById('slider-animate-false'),
	setButton = document.getElementById('set-sliders');

var sTrue = noUiSlider.create(eTrue, {
	animate: true,
	start: 20,
	range: {
		min: 0,
		max: 100
	}
});

var sFalse = noUiSlider.create(eFalse, {
	animate: false,
	start: 20,
	range: {
		min: 0,
		max: 100
	}
});

setButton.addEventListener('click', function(){
	sTrue.value.set(60);
	sFalse.value.set(60);
});
