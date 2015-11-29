var hoverSlider = document.getElementById('hover'),
	field = document.getElementById('hover-val');

noUiSlider.create(hoverSlider, {
	start: 20,
	behaviour: 'hover-snap',
	range: {
		'min':  0,
		'max':  10
	}
});

hoverSlider.noUiSlider.on('hover', function( value ){
	field.innerHTML = value;
});
