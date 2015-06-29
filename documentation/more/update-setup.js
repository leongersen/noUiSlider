var updateSlider = document.getElementById('slider-update'),
	updateSliderValue = document.getElementById('slider-update-value'),
	settings = {
		range: {
			'min': 0,
			'max': 40
		},
		start: 20,
		margin: 2,
		step: 2
	};

function bindValue ( ) {
	updateSlider.noUiSlider.on('update', function( values, handle ) {
		updateSliderValue.innerHTML = values[handle];
	});
}

noUiSlider.create(updateSlider, settings);
bindValue();
