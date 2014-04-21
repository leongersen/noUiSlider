$('#slider4').noUiSlider({
	start: [ 500 ],
	range: {
		'min': [     0 ],
		'10%': [   500,  500 ],
		'50%': [  4000, 1000 ],
		'max': [ 10000 ]
	},
	serialization: {
		lower: [
			new Link({
				target: $("#slider4val")
			})
		]
	}
});
