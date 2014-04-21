$("#features").noUiSlider({
	start: [20, 80],
	step: 10,
	margin: 20,
	connect: true,
	direction: 'rtl',
	orientation: 'vertical',
	behaviour: 'tap-drag',
	range: {
		'min': 0,
		'max': 100
	},
	serialization: {
		lower: [
			$.Link({
				target: $("#value-input")
			})
		],
		upper: [
			$.Link({
				target: $("#value-span"),
				method: "html"
			})
		],
		format: {
			mark: ',',
			decimals: 1
		}
	}
});
