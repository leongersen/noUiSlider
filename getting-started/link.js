$("#sample-readout").noUiSlider({
	start: [ 20 ],
	step: 10,
	range: {
		'min': [ 20 ],
		'max': [ 80 ]
	},
	serialization: {
		lower: [
			$.Link({
				target: $('#span')
			}),
			$.Link({
				target: $('#input')
			})
		],
		format: {
			decimals: 3,
			mark: ','
		}
	}
});
