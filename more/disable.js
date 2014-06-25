var slider = $('#disable');

function toggle(){

	// If the checkbox is checked, disabled the slider.
	// Otherwise, re-enable it.
	if ( this.checked ) {
		slider.attr('disabled', 'disabled');
	} else {
		slider.removeAttr('disabled');
	}
}

slider.noUiSlider({
	start: 80,
	connect: 'lower',
	range: {
		min: 0,
		max: 100
	}
});

$('#checkbox').click( toggle );
