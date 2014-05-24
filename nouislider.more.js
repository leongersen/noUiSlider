(function( $ ){

	/** @expose */
	$.noUiSlider.spread = function ( api, mode ) {

		// Set 'mode' to true for only the actual range points.
		if ( mode === true ) {
			return api.range.values;
		}

		// We'll build a list of steps.
		var indexes = {}, last = api.range.values.length - 1;

		$.each(api.range.values, function ( index, value ) {

			// Get the current step and the lower + upper positions.
			var step = api.steps.values[ index ],
				low = api.range.values[index],
				high = api.range.values[index+1],
				i;

			// Low can be 0.
			if ( low === false || !high ) {
				return;
			}

			if ( !step && !index ) {
				indexes['0'] = low;
				return;
			}

			// Find all steps in the subrange.
			for ( i = low; i < high; i += step ) {
				indexes[api.toStepping(i).toFixed(5)] = i;
			}
		});

		// Add the 'max' value to the end of the list.
		indexes['100'] = api.range.values[ last ];

		return indexes;
	};

}( window['jQuery'] || window['Zepto'] ));
