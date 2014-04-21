var slider = $('#keypress'),
	input = $('#input-with-keypress');

// Listen to keydown events on the input field.
input.keydown(function( e ) {

	// Convert the string to a number.
	var value = Number( slider.val() );

	// 38 is key up,
	// 40 is key down.
	switch ( e.which ) {
		case 38: slider.val( value + 1 );
			break;
		case 40: slider.val( value - 1 );
			break;
	}
});

slider.noUiSlider({
	start: 40,
	range: {
		'min': 20,
		'max': 80
	},
	serialization: {
		lower: [
			new Link({
				target: input
			})
		],
		format: {
			decimals: 0
		}
	}
});
