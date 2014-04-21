function handleSliderValue( value ){
	$(this).addClass('changed').text( value );
}

$("#function-object").noUiSlider({
	range: {
		'min': [ 0 ],
		'max': [ 100 ]
	},
	start: [ 20, 60 ],
	serialization: {
		lower: [

			$.Link({
				target: $("#showvalue"),
				method: handleSliderValue
			})

		]
	}
});
