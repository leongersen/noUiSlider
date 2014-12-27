
	// Run the standard initializer
	function initialize ( originalOptions ) {

		// Test the options once, not for every slider.
		var options = testOptions( originalOptions, this );

		// Loop all items, and provide a new closed-scope environment.
		return this.each(function(){
			closure(this, options, originalOptions);
		});
	}

	// Destroy the slider, then re-enter initialization.
	function rebuild ( options ) {

		return this.each(function(){

			// The rebuild flag can be used if the slider wasn't initialized yet.
			if ( !this.destroy ) {
				$(this).noUiSlider( options );
				return;
			}

			// Get the current values from the slider,
			// including the initialization options.
			var values = $(this).val(), originalOptions = this.destroy(),

				// Extend the previous options with the newly provided ones.
				newOptions = $.extend( {}, originalOptions, options );

			// Run the standard initializer.
			$(this).noUiSlider( newOptions );

			// Place Link elements back.
			this.reappend();

			// If the start option hasn't changed,
			// reset the previous values.
			if ( originalOptions.start === newOptions.start ) {
				$(this).val(values);
			}
		});
	}

	// Access the internal getting and setting methods based on argument count.
	function value ( ) {
		return this[0][ !arguments.length ? 'vGet' : 'vSet' ].apply(this[0], arguments);
	}

	// Override the .val() method. Test every element. Is it a slider? Go to
	// the slider value handling. No? Use the standard method.
	// Note how $.fn.val expects 'this' to be an instance of $. For convenience,
	// the above 'value' function does too.
	$.fn.val = function ( arg ) {

		// this === instanceof $

		function valMethod( a ){
			return a.hasClass(Classes[0]) ? value : $val;
		}

		// If no value is passed, this is 'get'.
		if ( !arguments.length ) {
			var first = $(this[0]);
			return valMethod(first).call(first);
		}

		var isFunction = $.isFunction(arg);

		// Return the set so it remains chainable. Make sure not to break
		// jQuery's .val(function( index, value ){}) signature.
		return this.each(function( i ){

			var val = arg, $t = $(this);

			if ( isFunction ) {
				val = arg.call(this, i, $t.val());
			}

			valMethod($t).call($t, val);
		});
	};

// Extend jQuery/Zepto with the noUiSlider method.
	$.fn.noUiSlider = function ( options, rebuildFlag ) {

		switch ( options ) {
			case 'step': return this[0].getCurrentStep();
			case 'options': return this[0].getOriginalOptions();
		}

		return ( rebuildFlag ? rebuild : initialize ).call(this, options);
	};
