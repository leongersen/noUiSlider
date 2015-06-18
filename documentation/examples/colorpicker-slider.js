var sliders = [],
	resultElement = document.getElementById('result');

Array.prototype.forEach.call(document.getElementsByClassName('sliders'), function ( slider, index ) {

	sliders[index] = noUiSlider.create(slider, {
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
	sliders[index].on('slide', setColor);
});
