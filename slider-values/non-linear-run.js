$('#slider3').noUiSlider({
	start: [ 4000 ],
	range: {
		'min': [  2000 ],
		'30%': [  4000 ],
		'70%': [  8000 ],
		'max': [ 10000 ]
	},
	serialization: {
		lower: [
			$.Link({
				target: $("#slider3val")
			})
		]
	}
});
