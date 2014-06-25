$("#rangeSlider").noUiSlider({
	start: [ 950, 5060 ],
	range: {
		'min': 50,
		'max': 5960
	},
	connect: true,
	// Set some default formatting options.
	// These options will be applied to any Link
	// that doesn't overwrite these values.
	format: wNumb({
		decimals: 1
	})
});
