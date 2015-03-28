// Helpers

	// Shorthand for base dimensions.
	function baseSize ( ) {
		return $Base['offset' + ['Width', 'Height'][options.ort]];
	}

	// External event handling
	function fireEvents ( events ) {
	/* TODO
		// Use the external api to get the values.
		// Wrap the values in an array, as .trigger takes
		// only one additional argument.
		var index, values = [ $Target.val() ];

		for ( index = 0; index < events.length; index += 1 ){
			$Target.trigger(events[index], values);
		}
	*/
	}

	// Returns the input array, respecting the slider direction configuration.
	function inSliderOrder ( values ) {

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		if ( options.dir ) {
			return values.reverse();
		}

		return values;
	}
