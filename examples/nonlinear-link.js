// Write the CSS 'left' value to a span.
function leftValue ( value, handle, slider ) {
	$(this).text( handle.parent()[0].style.left );
}

// Bind two elements to the lower handle.
// The first item will display the slider value, 
// the second shows how far the handle moved
// from the left edge of the slider.
$("#nonlinear").Link('lower', $('#lower-value'));
$("#nonlinear").Link('lower', $('#lower-offset'), leftValue);


// Do the same for the upper handle.
$("#nonlinear").Link('upper', $('#upper-value'));
$("#nonlinear").Link('upper', $('#upper-offset'), leftValue);
