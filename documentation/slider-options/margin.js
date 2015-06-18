var element = document.getElementById('slider-margin');

var marginSlider = noUiSlider.create(element, {
		start: [ 20, 80 ],
		margin: 30,
		range: {
			'min': 0,
			'max': 100
		}
	});
