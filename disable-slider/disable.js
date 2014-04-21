var slider = $('#disable');

function toggle(){
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
