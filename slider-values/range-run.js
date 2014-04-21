$('#slider1').noUiSlider({
	start: [ 4000 ],
	range: {
		'min': [  2000 ],
		'max': [ 10000 ]
	},
	serialization: {
		lower: [
			$.Link({
				target: $("#slider1val")
			})
		]
	}
});
