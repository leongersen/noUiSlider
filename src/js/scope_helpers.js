
	// Shorthand for base dimensions.
	function baseSize ( ) {
		var rect = scope_Base.getBoundingClientRect(), alt = 'offset' + ['Width', 'Height'][options.ort];
		return options.ort === 0 ? (rect.width||scope_Base[alt]) : (rect.height||scope_Base[alt]);
	}

	// External event handling
	function fireEvent ( event, handleNumber, tap ) {

		var i;

		// During initialization, do not fire events.
		for ( i = 0; i < options.handles; i++ ) {
			if ( scope_Locations[i] === -1 ) {
				return;
			}
		}

		if ( handleNumber !== undefined && options.handles !== 1 ) {
			handleNumber = Math.abs(handleNumber - options.dir);
		}

		Object.keys(scope_Events).forEach(function( targetEvent ) {

			var eventType = targetEvent.split('.')[0];

			if ( event === eventType ) {
				scope_Events[targetEvent].forEach(function( callback ) {

					callback.call(
						// Use the slider public API as the scope ('this')
						scope_Self,
						// Return values as array, so arg_1[arg_2] is always valid.
						asArray(valueGet()),
						// Handle index, 0 or 1
						handleNumber,
						// Unformatted slider values
						asArray(inSliderOrder(Array.prototype.slice.call(scope_Values))),
						// Event is fired by tap, true or false
						tap || false,
						// Left offset of the handle, in relation to the slider
						scope_Locations
					);
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
