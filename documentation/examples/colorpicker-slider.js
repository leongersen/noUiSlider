var resultElement = document.getElementById('result'),
	sliders = document.getElementsByClassName('sliders');

Array.prototype.forEach.call(sliders, function ( slider, index ) {

	noUiSlider.create(slider, {
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
	slider.noUiSlider.on('slide', setColor);
});
