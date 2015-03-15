// Listen to keydown events on the input field.
input.keydown(function( e ) {

	// Convert the string to a number.
	var value = Number( slider.val() ),
		sliderStep = slider.noUiSlider('step');

	// Select the stepping for the first handle.
	sliderStep = sliderStep[0];

	// 13 is enter,
	// 38 is key up,
	// 40 is key down.
	switch ( e.which ) {
		case 13:
			$(this).change();
			break;
		case 38: slider.val( value + sliderStep[1] );
			break;
		case 40: slider.val( value - sliderStep[0] );
			break;
	}
});
