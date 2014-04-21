$('#slider5').noUiSlider({
	start: [ 50, 800 ],
	snap: true,
	range: {
		'min': 0,
		'10%': 50,
		'20%': 100,
		'30%': 150,
		'40%': 500,
		'50%': 800,
		'max': 1000
	},
	serialization: {
		lower: [
			$.Link({
				target: $("#slider5val1")
			})
		],
		upper: [
			$.Link({
				target: $("#slider5val2")
			})
		]
	}
});
