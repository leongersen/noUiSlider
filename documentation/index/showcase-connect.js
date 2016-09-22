var valueInput = document.getElementById('value-input');
var valueSpan1 = document.getElementById('value-span-1');
var valueSpan2 = document.getElementById('value-span-2');

// When the slider value changes, update the input and span
range.noUiSlider.on('update', function( values, handle ) {

	var value = values[handle];

	switch ( handle ) {
		case 0:
			valueSpan1.innerHTML = value;
			break;

		case 1:
			valueInput.value = value;
			break;

		case 2:
			valueSpan2.innerHTML = value;
			break;
	}
});

// When the input changes, set the slider value
valueInput.addEventListener('change', function(){
	range.noUiSlider.set([null, this.value]);
});
