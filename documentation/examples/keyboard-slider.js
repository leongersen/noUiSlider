var slider = document.getElementById('keyboard');

noUiSlider.create(slider, {
	start: 10,
	step: 10,
	range: {
		'min': 0,
		'max': 100
	}
});
