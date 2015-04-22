
	// Run the standard initializer
	function initialize ( target, originalOptions ) {

		if ( !!target.nodeName ) {
			// todo error
			//alert('fool!');
		}

		// Test the options once, not for every slider. // TODO not true
		var options = testOptions( originalOptions, target ),
			slider = closure( target, options );

		// Use the public value method to set the start values.
		slider.value.set(options.start);

		return slider;
	}

	return {
		create: initialize
	};
