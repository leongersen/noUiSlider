$('.sliders').noUiSlider({
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
$('.sliders').on('slide', setColor);
