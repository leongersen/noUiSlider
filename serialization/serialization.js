$("#serialization").noUiSlider({
	start: 50,
	range: {
		'min': 100,
		'max': 5000
	},
	serialization: {
		lower: [
		// Write the values to
		// an input with id 'field'
			new Link({
				target: $("#field")
			})
		],
		format: {
		// Set formatting
			thousand: ' ',
			prefix: '$'
		}
	}
});
