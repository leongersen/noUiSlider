$('#slider2').noUiSlider({
	start: [ 4000 ],
	step: 1000,
	range: {
		'min': [  2000 ],
		'max': [ 10000 ]
	},
	serialization: {
		lower: [
			$.Link({
				target: $("#slider2val")
			})
		]
	}
});
