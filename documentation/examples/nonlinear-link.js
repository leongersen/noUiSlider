// Write the CSS 'left' value to a span.
function leftValue ( value, handle, slider ) {
	$(this).text( handle.parent()[0].style.left );
}

var lowerValue = document.getElementById('lower-value'),
	lowerOffset = document.getElementById('lower-offset'),
	upperValue = document.getElementById('upper-value'),
	upperOffset = document.getElementById('upper-offset');


nonLinearSlider.on('update', function ( values, handle ) {
	
	var value = values[handle];
	
	if ( handle ) {
		lowerValue.innerHTML = value;
	} else {
		upperValue.innerHTML = value;
	}	
});



// Bind two elements to the lower handle.
// The first item will display the slider value, 
// the second shows how far the handle moved
// from the left edge of the slider.
//$("#nonlinear").Link('lower').to($('#lower-value'));
//$("#nonlinear").Link('lower').to($('#lower-offset'), leftValue);
//
//
//// Do the same for the upper handle.
//$("#nonlinear").Link('upper').to($('#upper-value'));
//$("#nonlinear").Link('upper').to($('#upper-offset'), leftValue);
