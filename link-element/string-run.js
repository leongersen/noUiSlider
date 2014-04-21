$("#slider-string").noUiSlider({
	range: {
		'min': [ 0 ],
		'max': [ 50 ]
	},
	start: [ 10 ],
	serialization: {
		lower: [
		
			$.Link({	
				target: "maximum-rent"
			})

		]	
	}
});

$("#alertform").click(function(){
	alert( $("#example").serialize() );
});
	
