// Write the CSS 'left' value to a span.
function leftValue ( handle ) {
	return handle.parentElement.style.left;
}

var lowerValue = document.getElementById('lower-value'),
	lowerOffset = document.getElementById('lower-offset'),
	upperValue = document.getElementById('upper-value'),
	upperOffset = document.getElementById('upper-offset'),
	handles = nonLinearSlider.getElementsByClassName('noUi-handle');

// Display the slider value and how far the handle moved
// from the left edge of the slider.
nonLinearSlider.noUiSlider.on('update', function ( values, handle ) {
	if ( !handle ) {
		lowerValue.innerHTML = values[handle] + ', ' + leftValue(handles[handle]);
	} else {
		upperValue.innerHTML = values[handle] + ', ' + leftValue(handles[handle]);
	}
});
