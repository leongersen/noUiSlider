$("#slider-function").noUiSlider({
	range: {
		'min': [ 0 ],
		'max': [ 243 ]
	},
	start: [ 243 ],
	serialization: {
		lower: [

			$.Link({
				target: function( val ){
				
					$('html').css({
						'background': 'rgb(243, ' + val + ', 243)'
					});
				},
				format: {
					decimals: 0
				}
			})

		]
	}
});
