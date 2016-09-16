
	// Append a origin to the base
	function addOrigin ( base ) {
		var origin = addNodeTo(base, options.cssClasses.origin);
		addNodeTo(origin, options.cssClasses.handle);
		return origin;
	}

	// Insert nodes for connect elements
	function addConnect ( base, add ) {

		if ( !add ) {
			return false;
		}

		return addNodeTo(base, options.cssClasses.connect);
	}

	// Add handles to the slider base.
	function addElements ( nrHandles, connectOptions, base ) {

		var index;

		scope_Handles = [];
		scope_Connects = [];

		scope_Connects.push(addConnect(base, connectOptions[0]));

		// [::::O====O====O====]
		// connectOptions = [0, 1, 1, 1]

		for ( index = 0; index < nrHandles; index += 1 ) {

			// Keep a list of all added handles.
			scope_Handles.push(addOrigin(base));
			scope_HandleNumbers[index] = index;
			scope_Connects.push(addConnect(base, connectOptions[index + 1]));
		}
	}

	// Initialize a single slider.
	function addSlider ( target ) {

		// Apply classes and data to the target.
		addClass(target, options.cssClasses.target);

		if ( options.dir === 0 ) {
			addClass(target, options.cssClasses.ltr);
		} else {
			addClass(target, options.cssClasses.rtl);
		}

		if ( options.ort === 0 ) {
			addClass(target, options.cssClasses.horizontal);
		} else {
			addClass(target, options.cssClasses.vertical);
		}

		scope_Base = addNodeTo(target, options.cssClasses.base);
	}
