var keyboardSlider = document.getElementById('keyboard');

noUiSlider.create(keyboardSlider, {
	start: 10,
	step: 10,
	range: {
		'min': 0,
		'max': 100
	}
});
