$('#html5').noUiSlider({
	 range: {
		'min': -20,
		'max': 40
	}
	,start: [10,30]
	,connect: true
	,serialization: {
		lower: [
			$.Link({
				target: $('#input-select'),
				
			// The select element wont show
			// any decimals
				format: {
					decimals: 0
				}
			})
		],
		upper: [
			$.Link({
				target: $('#input-number')
			})
		]
	}
});
