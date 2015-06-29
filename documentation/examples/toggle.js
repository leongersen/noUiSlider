var toggleSlider = document.getElementById('slider-toggle');

noUiSlider.create(toggleSlider, {
	orientation: "vertical",
	start: 0,
	range: {
		'min': [0, 1],
		'max': 1
	},
	format: wNumb({
		decimals: 0
	})
})

toggleSlider.noUiSlider.on('update', function( values, handle ){
	if ( values[handle] === '1' ) {
		toggleSlider.className += ' off';
	} else {
		toggleSlider.className = toggleSlider.className.slice(0, -4);
	}
});
