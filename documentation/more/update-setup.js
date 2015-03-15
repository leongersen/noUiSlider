$('#slider-update').noUiSlider({
    range: {
		'min': 0,
		'max': 40
	},
	start: 20,
	margin: 2,
	step: 2
});

$('#slider-update').Link().to( $('#slider-update-value'), 'text' );
