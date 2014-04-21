var slider = $('#update'),
	write = $.Link({
		target: $('#value'),
		method: 'text'
	});

slider.noUiSlider({
    range: {
		'min': 0,
		'max': 40
	},
	start: 20,
	margin: 2,
	step: 2,
	serialization: {
		lower: [ write ]
	}
});

$('button').click(function(){

	// Get the new values from the button.
	var range = $(this).attr('data-range').split(',');

	// The options will be merged with those
	// provided on initialization.
    slider.noUiSlider({
		range: {
			'min': Number(range[0]),
			'max': Number(range[1])
		}
    }, true);
});
