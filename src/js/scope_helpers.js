// Helpers

	// Shorthand for base dimensions.
	function baseSize ( ) {
		return scope_Base['offset' + ['Width', 'Height'][options.ort]];
	}

	// External event handling
	function fireEvent ( event, values, handle ) {

		Object.keys(scope_Events).forEach(function( targetEvent ) {

			var eventType = targetEvent.split('.')[0];

			if ( event === eventType ) {
				scope_Events[targetEvent].forEach(function( callback ) {
					callback( values, handle, targetEvent );
				});
			}
		});
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
