var element = document.getElementById('slider-direction'),
	directionSlider = noUiSlider.create(element, {
		start: 20,
		direction: 'rtl',
		range: {
			'min': 0,
			'max': 100
		}
	});
