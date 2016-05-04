// Listen to keydown events on the input field.
input.addEventListener('keydown', function( e ) {

	// Convert the string to a number.
	var value = Number( keypressSlider.noUiSlider.get() ),
		sliderStep = keypressSlider.noUiSlider.steps()

	// Select the stepping for the first handle.
	sliderStep = sliderStep[0];

	// 13 is enter,
	// 38 is key up,
	// 40 is key down.
	switch ( e.which ) {
		case 13:
			keypressSlider.noUiSlider.set(this.value);
			break;
		case 38:
			keypressSlider.noUiSlider.set( value + sliderStep[1] );
			break;
		case 40:
			keypressSlider.noUiSlider.set( value - sliderStep[0] );
			break;
	}
});
