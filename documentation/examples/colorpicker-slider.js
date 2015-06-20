var resultElement = document.getElementById('result'),
	sliders = document.getElementsByClassName('sliders');

for ( var i = 0; i < sliders.length; i++ ) {

	noUiSlider.create(sliders[i], {
		start: 127,
		connect: "lower",
		orientation: "vertical",
		range: {
			'min': 0,
			'max': 255
		},
		format: wNumb({
			decimals: 0
		})
	});

	// Bind the color changing function
	// to the slide event.
	sliders[i].noUiSlider.on('slide', setColor);
}
