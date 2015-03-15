// Tags after '-inline-' are inserted as HTML.
// noUiSlider writes to the first element it finds.
$("#slider-tooltip").Link('upper').to('-inline-<div class="tooltip"></div>', function ( value ) {

	// The tooltip HTML is 'this', so additional
	// markup can be inserted here.
	$(this).html(
		'<strong>Value: </strong>' +
		'<span>' + value + '</span>'
	);
});
