// Class handling

	// Delimit proposed values for handle positions.
	function getPositions ( a, b, delimit ) {

		// Add movement to current position.
		var c = a + b[0], d = a + b[1];

		// Only alter the other position on drag,
		// not on standard sliding.
		if ( delimit ) {
			if ( c < 0 ) {
				d += Math.abs(c);
			}
			if ( d > 100 ) {
				c -= ( d - 100 );
			}

			// Limit values to 0 and 100.
			return [limit(c), limit(d)];
		}

		return [c,d];
	}


// Event handling

	// Provide a clean event with standardized offset values.
	function fixEvent ( e ) {

		// Prevent scrolling and panning on touch events, while
		// attempting to slide. The tap event also depends on this.
		e.preventDefault();

		// Filter the event to register the type, which can be
		// touch, mouse or pointer. Offset changes need to be
		// made on an event specific basis.
		var  touch = e.type.indexOf('touch') === 0
			,mouse = e.type.indexOf('mouse') === 0
			,pointer = e.type.indexOf('pointer') === 0
			,x,y, event = e;

		// IE10 implemented pointer events with a prefix;
		if ( e.type.indexOf('MSPointer') === 0 ) {
			pointer = true;
		}

		// Get the originalEvent, if the event has been wrapped
		// by jQuery. Zepto doesn't wrap the event.
		if ( e.originalEvent ) {
			e = e.originalEvent;
		}

		if ( touch ) {
			// noUiSlider supports one movement at a time,
			// so we can select the first 'changedTouch'.
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY;
		}

		if ( mouse || pointer ) {

			// Polyfill the pageXOffset and pageYOffset
			// variables for IE7 and IE8;
			if( !pointer && window.pageXOffset === undefined ){
				window.pageXOffset = document.documentElement.scrollLeft;
				window.pageYOffset = document.documentElement.scrollTop;
			}

			x = e.clientX + window.pageXOffset;
			y = e.clientY + window.pageYOffset;
		}

		event.points = [x, y];
		event.cursor = mouse;

		return event;
	}


// DOM additions

	// Append a handle to the base.
	function addHandle ( direction, index ) {

		var handle = $('<div><div/></div>').addClass( Classes[2] ),
			additions = [ '-lower', '-upper' ];

		if ( direction ) {
			additions.reverse();
		}

		handle.children().addClass(
			Classes[3] + " " + Classes[3]+additions[index]
		);

		return handle;
	}

	// Add the proper connection classes.
	function addConnection ( connect, target, handles ) {

		// Apply the required connection classes to the elements
		// that need them. Some classes are made up for several
		// segments listed in the class list, to allow easy
		// renaming and provide a minor compression benefit.
		switch ( connect ) {
			case 1:	target.addClass( Classes[7] );
					handles[0].addClass( Classes[6] );
					break;
			case 3: handles[1].addClass( Classes[6] );
					/* falls through */
			case 2: handles[0].addClass( Classes[7] );
					/* falls through */
			case 0: target.addClass(Classes[6]);
					break;
		}
	}

	// Add handles to the slider base.
	function addHandles ( nrHandles, direction, base ) {

		var index, handles = [];

		// Append handles.
		for ( index = 0; index < nrHandles; index += 1 ) {

			// Keep a list of all added handles.
			handles.push( addHandle( direction, index ).appendTo(base) );
		}

		return handles;
	}

	// Initialize a single slider.
	function addSlider ( direction, orientation, target ) {

		// Apply classes and data to the target.
		target.addClass([
			Classes[0],
			Classes[8 + direction],
			Classes[4 + orientation]
		].join(' '));

		return $('<div/>').appendTo(target).addClass( Classes[1] );
	}
