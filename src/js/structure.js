
	// Append a origin to the base
	function addOrigin ( base, handleNumber ) {
		var origin = addNodeTo(base, options.cssClasses.origin);
		var handle = addNodeTo(origin, options.cssClasses.handle);
		handle.setAttribute('data-handle', handleNumber);
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
	function addElements ( connectOptions, base ) {

		var index;
		var handleNumber;

		scope_Handles = [];
		scope_Connects = [];

		scope_Connects.push(addConnect(base, connectOptions[0]));

		// [::::O====O====O====]
		// connectOptions = [0, 1, 1, 1]

		for ( index = 0; index < options.handles; index += 1 ) {

			// HandleNumbers are inverted for rtl sliders
			handleNumber = indexToHandleNumber(index);

			// Keep a list of all added handles.
			scope_Handles.push(addOrigin(base, handleNumber));
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
