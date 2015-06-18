var element = document.getElementById('html5'),
	html5Slider = noUiSlider.create(element, {
		start: [ 10, 30 ],
		connect: true,
		range: {
			'min': -20,
			'max': 40
		}
	});
