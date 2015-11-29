var updateSlider = document.getElementById('slider-update'),
	updateSliderValue = document.getElementById('slider-update-value');

noUiSlider.create(updateSlider, {
	range: {
		'min': 0,
		'max': 40
	},
	start: 20,
	margin: 2,
	step: 2
});

updateSlider.noUiSlider.on('update', function( values, handle ) {
	updateSliderValue.innerHTML = values[handle];
});
