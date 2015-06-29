var valueInput = document.getElementById('value-input'),
	valueSpan = document.getElementById('value-span');

// When the slider value changes, update the input and span
slider.noUiSlider.on('update', function( values, handle ) {
	if ( handle ) {
		valueInput.value = values[handle];
	} else {
		valueSpan.innerHTML = values[handle];
	}
});

// When the input changes, set the slider value
valueInput.addEventListener('change', function(){
	slider.noUiSlider.set([null, this.value]);
});
