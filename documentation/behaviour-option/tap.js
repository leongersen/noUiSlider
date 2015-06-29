tapSlider = document.getElementById('tap');

noUiSlider.create(tapSlider, {
	start: 40,
	behaviour: 'tap',
	connect: 'upper',
	range: {
		'min':  20,
		'max':  80
	}
});
