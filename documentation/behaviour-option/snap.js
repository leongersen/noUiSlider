snapSlider = document.getElementById('snap');

noUiSlider.create(snapSlider, {
	start: 40,
	behaviour: 'snap',
	connect: 'lower',
	range: {
		'min':  20,
		'max':  80
	}
});
