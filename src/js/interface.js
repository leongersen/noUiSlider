
	// Run the standard initializer
	function initialize ( originalOptions ) {

		// Test the options once, not for every slider.
		var options = testOptions( originalOptions, this );

		closure(this, options, originalOptions);
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
		console.log(this, !arguments.length ? 'vGet' : 'vSet');
		return this[ !arguments.length ? 'vGet' : 'vSet' ].apply(this, arguments);
	}

	window.val = function ( arg ) {

		// this = nodeList

		function valMethod ( a ){
			return a.classList.contains(Classes[0]) ? value : $val;
		}

		// If no value is passed, this is 'get'.
		if ( !arguments.length ) {
			return valMethod(this[0]).call(this[0]);
		}

		Array.prototype.forEach.call(this, function( node ){
			valMethod(node).call(node, arg);
		});
	};

	// Override the .val() method. Test every element. Is it a slider? Go to
	// the slider value handling. No? Use the standard method.
	// $.fn.val

// Extend jQuery/Zepto with the noUiSlider method.
	window.noUiSlider = function ( targets, options, rebuildFlag ) {

		switch ( options ) {
			case 'step': return this[0].getCurrentStep();
			case 'options': return this[0].getOriginalOptions();
		}

		return ( rebuildFlag ? rebuild : initialize ).call(targets[0], options);
	};

	// $.fn.noUiSlider
