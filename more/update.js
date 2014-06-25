$('button').click(function(){

	// Get the new values from the button.
	var range = $(this).attr('data-range').split(',');

	// The options will be merged with those
	// provided on initialization.
    $('#slider-update').noUiSlider({
		range: {
			'min': Number(range[0]),
			'max': Number(range[1])
		}
    }, true);
});
