function crossUpdate ( value, handle, slider ) {

	// If the sliders aren't interlocked, don't
	// cross-update.
	if ( !lockedState ) return;

	// Select whether to increase or decrease
	// the other slider value.
	var lValue = slider1.is(slider) ? 1 : 0,
		hValue = lValue ? 0 : 1;

	// Modify the slider value.
	value -= ( values[hValue] - values[lValue] );

	// Set the value
	$(this).val( value );
}
