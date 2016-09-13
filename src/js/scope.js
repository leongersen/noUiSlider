
	function getBounds ( handleNumber ) {

		var lowerMargin = 0;
		var upperMargin = 0;
		var lowerLimit = 0;
		var upperLimit = 0;

		if ( handleNumber > 0 ) {
			lowerMargin = scope_Locations[handleNumber-1] + options.margin;
			lowerLimit = scope_Locations[handleNumber-1] + options.limit;
		}

		if ( handleNumber < scope_Handles.length - 1 ) {
			upperMargin = scope_Locations[handleNumber+1] - options.margin;
			upperLimit = scope_Locations[handleNumber+1] - options.limit;
		}

		return {
			lowerMargin: lowerMargin,
			upperMargin: upperMargin,
			lowerLimit: lowerLimit,
			upperLimit: upperLimit
		};
	}

	// Split out the handle positioning logic so the Move event can use it, too
	function checkHandlePosition ( handleNumber, to ) {

		var bounds = getBounds(handleNumber);

		// For sliders with multiple handles,
		// limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		to = Math.min(Math.max(to, bounds.lowerMargin), bounds.upperMargin);

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable. 'noLimitOption' is set to 'false'
		// for the .val() method, except for pass 4/4.
	//	if ( noLimitOption !== false && options.limit && scope_Handles.length > 1 ) {
	//		to = handleNumber ? Math.min ( to, lowerLimit ) : Math.max( to, upperLimit ); // todo ternary assumes 0 or 1
	//	} // TODO

		// Handle the step option.
		to = scope_Spectrum.getStep(to);

		// Limit percentage to the 0 - 100 range
		to = limit(to);

		// Return false if handle can't move
		if ( to === scope_Locations[handleNumber] ) {
			console.log('hi', handleNumber, to, scope_Locations[handleNumber] );
			return false;
		}

		return to;
	}

	// Updates scope_Locations and scope_Values, updates visual state
	function updateHandlePosition ( handleNumber, to ) {

		// Update locations.
		scope_Locations[handleNumber] = to;

		// Convert the value to the slider stepping/range.
		scope_Values[handleNumber] = scope_Spectrum.fromStepping( to );

		// Called sync or on the next animationFrame
		var stateUpdate = function() {
			scope_Handles[handleNumber].style[options.style] = to + '%';
			populateConnects();
		};

		// Set the handle to the new position.
		// Use requestAnimationFrame for efficient painting.
		// No significant effect in Chrome, Edge sees dramatic performace improvements.
		// Option to disable is useful for unit tests, and single-step debugging.
		if ( window.requestAnimationFrame && options.useRequestAnimationFrame ) {
			window.requestAnimationFrame(stateUpdate);
		} else {
			stateUpdate();
		}

		fireEvent('update', handleNumber);
	}

	// Test suggested values and apply margin, step.
	function setHandle ( handleNumber, to ) {

		to = checkHandlePosition(handleNumber, to);

		if ( to === false ) {
			return false;
		}

		updateHandlePosition(handleNumber, to);

		return true;


/*
		// Take care of handle stacking by manipulating the z-index of the inner div.
		// Handles that are moved go to the top of the stack, so that the movement can be reverted,
		// in order to be able to avoid a dead end.
		var allHandles = handle.parentNode.childNodes;
		var handleCount = allHandles.length;
		var minZIndex = 10;

		// Multiplication by 2 is used to double the z-index range, so that the initialization of the
		// left part of the slider is independent from the initialization of the right part of the slider.
		var maxZIndex = minZIndex + 2 * handleCount - 1;

		// Take the z-index of the handle's inner div, defaulting to 0, if no z-index exists.
		var zIndex = parseInt( handle.childNodes[0].style.zIndex ) || 0;

		// If the z-index does not exist and, thus, initialization is in order.
		if ( zIndex === 0 ) {

			// Calculate the position of the handle among all handles by counting previous siblings.
			var handleIndex = 0;
			var sibling = handle;

			while ( ( sibling = sibling.previousSibling) !== null ) {
				handleIndex++;
			}

			// If the handle is up to the middle of the slider.
			if ( to <= 50 ) {
				// The z-indices up to the middle of the slider are increasing.
				// The range of z-indices up to the middle of the slider is [minZIndex, minZIndex + handleCount - 1].
				handle.childNodes[0].style.zIndex = ( minZIndex + handleIndex ).toString();
			}

			// Else, that is the handle is after the middle of the slider.
			else {
				// The z-indices after the middle of the slider are decreasing.
				// The range of z-indices after the middle of the slider is [minZIndex + handleCount, maxZIndex].
				handle.childNodes[0].style.zIndex = ( maxZIndex - handleIndex ).toString();
			}
		}

		// If the z-index exists and the handle is not already at the top (if it already is at the top, then nothing needs to be done).
		else if ( zIndex < maxZIndex ) {

			// Make it go a step above the top (because of needing to take a step down afterwards, when all handles are iterated).
			handle.childNodes[0].style.zIndex = ( maxZIndex + 1 ).toString();

			// Iterate all handles.
			for ( var i = 0; i < handleCount; i++ ) {

				// The z-index of the other handle's inner div.
				var otherZIndex = parseInt( allHandles[i].childNodes[0].style.zIndex ) || 0; // TODO reads style

				// If the other handle's inner div is above the current handle's inner div before the z-index update,
				// then take a step down.
				if ( otherZIndex > zIndex ) {
					allHandles[i].childNodes[0].style.zIndex = ( otherZIndex - 1 ).toString();
				}
			}
		}
*/


	}

	// Updates style attribute for connect nodes
	function populateConnects ( ) { // TODO run only after init

		scope_Connects.forEach(function( connect, index ) {

			// Skip connects set to false
			if ( !connect ) {
				return;
			}

			var l = 0, h = 100;

			if ( index !== 0 ) {
				l = scope_Locations[index - 1];
			}

			if ( index !== scope_Connects.length - 1 ) {
				h = scope_Locations[index];
			}

			// Start at 0
			connect.style[options.style] = l + '%';
			connect.style[options.styleOposite] = (100 - h) + '%';
		});
	}

	// ...
	function setValue ( to, handleNumber ) {

		// Setting with null indicates an 'ignore'.
		// Inputting 'false' is invalid.
		if ( to === null && to === false ) {
			return;
		}

		// If a formatted number was passed, attemt to decode it.
		if ( typeof to === 'number' ) {
			to = String(to);
		}

		to = options.format.from(to);

		// Request an update for all links if the value was invalid.
		// Do so too if setting the handle fails.
		if ( to === false || isNaN(to) || setHandle(handleNumber, scope_Spectrum.toStepping(to)) === false ) {
			fireEvent('update', handleNumber);
		}
	}

	// Loop values from value method and apply them.
	function setValues ( values ) {

		values.forEach(setValue);

	/*
		var i, trigger, to,
		basePasses = (values.length*values.length),
		passesIncludingLimitingPass = basePasses+(options.limit?values.length:0);

		// If there are multiple handles to be set run the setting
		// mechanism twice for the first handle, to make sure it
		// can be bounced of the second one properly.
		for ( i = 0; i < passesIncludingLimitingPass; i += 1 ) {
			var isLimitingPass = i>basePasses;

			trigger = i%values.length;
			trigger = isLimitingPass&&options.dir ? values.length-1-trigger : trigger;

			// Get the current argument from the array.
			to = values[trigger];

			if ( to !== null && to !== false ) {




			}
		}*/
	}

	// Set the slider value.
	function valueSet ( input, fireSetEvent ) {

		var values = asArray( input ), i;

		// Event fires by default
		fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);

		// The RTL settings is implemented by reversing the front-end,
		// internal mechanisms are the same.
		if ( options.dir && options.handles > 1 ) {
			values.reverse();
		}

		// Animation is optional.
		// Make sure the initial values where set before using animated placement.
		if ( options.animate && scope_Locations[0] !== -1 ) {
			addClassFor( scope_Target, options.cssClasses.tap, options.animationDuration );
		}

		setValues ( values );

		// Fire the 'set' event for both handles.
		for ( i = 0; i < scope_Handles.length; i++ ) {

			// Fire the event only for handles that received a new value, as per #579
			if ( values[i] !== null && fireSetEvent ) {
				fireEvent('set', i);
			}
		}
	}

	// Get the slider value.
	function valueGet ( ) {

		var i, retour = [];

		// Get the value from all handles.
		for ( i = 0; i < options.handles; i += 1 ){
			retour[i] = options.format.to( scope_Values[i] );
		}

		return inSliderOrder( retour );
	}

	// Removes classes from the root and empties it.
	function destroy ( ) {

		for ( var key in options.cssClasses ) {
			if ( !options.cssClasses.hasOwnProperty(key) ) { continue; }
			removeClass(scope_Target, options.cssClasses[key]);
		}

		while (scope_Target.firstChild) {
			scope_Target.removeChild(scope_Target.firstChild);
		}

		delete scope_Target.noUiSlider;
	}

	// TODO
	function topStepOfRangeBelow ( nearbySteps ) {

		var numStepsInRangeBelow = (nearbySteps.thisStep.xVal - nearbySteps.stepBefore.xVal) / nearbySteps.stepBefore.xNumSteps;
		var highestCompleteStep = Math.ceil(Number(numStepsInRangeBelow.toFixed(3)) - 1); // todo why tofixed
		var stepBelow = nearbySteps.stepBefore.xVal + (nearbySteps.stepBefore.xNumSteps * highestCompleteStep);

		return stepBelow;
	}

	// Get the current step size for the slider.
	function getCurrentStep ( ) {

		// Check all locations, map them to their stepping point.
		// Get the step point, then find it in the input list.
		var retour = scope_Locations.map(function( location, index ){

			var nearbySteps = scope_Spectrum.getNearbySteps( location ),
			// As per #391, the comparison for the decrement step can have some rounding issues.
			stepDecimals = scope_Spectrum.countStepDecimals(),
			// Get the current numeric value
			value = scope_Values[index];

			var increment, decrement;
			if (location == 100) {
				increment = null;
				decrement = value-topStepOfRangeBelow(nearbySteps);
				decrement = Number(decrement.toFixed(stepDecimals)); // Round per #391
			} else if (location === 0) {
				increment = nearbySteps.thisStep.xNumSteps;
				decrement = null;
			} else {
				increment = nearbySteps.thisStep.xNumSteps;
				if (increment !== false) {
					if (value+increment>nearbySteps.stepAfter.xVal) {
						increment = nearbySteps.stepAfter.xVal-value;
					}
					increment = Number(increment.toFixed(stepDecimals));
				}
				if (value>nearbySteps.thisStep.xVal) {
					decrement = nearbySteps.thisStep.xNumSteps;
				} else if (nearbySteps.stepBefore.xNumSteps === false) {
					decrement = false;
				} else {
					decrement = value-topStepOfRangeBelow(nearbySteps);
					decrement = Number(decrement.toFixed(stepDecimals)); // Round per #391
				}
			}

			return [decrement, increment];
		});

		// Return values in the proper order.
		if ( options.dir ) {
			retour = retour.reverse();
		}
		return retour;
	}

	// Attach an event to this slider, possibly including a namespace
	function bindEvent ( namespacedEvent, callback ) {
		scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
		scope_Events[namespacedEvent].push(callback);

		// If the event bound is 'update,' fire it immediately for all handles.
		if ( namespacedEvent.split('.')[0] === 'update' ) {
			scope_Handles.forEach(function(a, index){
				fireEvent('update', index);
			});
		}
	}

	// Undo attachment of event
	function removeEvent ( namespacedEvent ) {

		var event = namespacedEvent && namespacedEvent.split('.')[0],
			namespace = event && namespacedEvent.substring(event.length);

		Object.keys(scope_Events).forEach(function( bind ){

			var tEvent = bind.split('.')[0],
				tNamespace = bind.substring(tEvent.length);

			if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
				delete scope_Events[bind];
			}
		});
	}

	// Updateable: margin, limit, step, range, animate, snap
	function updateOptions ( optionsToUpdate, fireSetEvent ) {

		// Spectrum is created using the range, snap, direction and step options.
		// 'snap' and 'step' can be updated, 'direction' cannot, due to event binding.
		// If 'snap' and 'step' are not passed, they should remain unchanged.
		var v = valueGet(), newOptions = testOptions({
			start: [0, 0],
			margin: optionsToUpdate.margin,
			limit: optionsToUpdate.limit,
			step: optionsToUpdate.step === undefined ? options.singleStep : optionsToUpdate.step,
			range: optionsToUpdate.range,
			animate: optionsToUpdate.animate,
			snap: optionsToUpdate.snap === undefined ? options.snap : optionsToUpdate.snap
		});

		['margin', 'limit', 'range', 'animate'].forEach(function(name){

			// Only change options that we're actually passed to update.
			if ( optionsToUpdate[name] !== undefined ) {
				options[name] = optionsToUpdate[name];
			}
		});

		// Save current spectrum direction as testOptions in testRange call
		// doesn't rely on current direction
		newOptions.spectrum.direction = scope_Spectrum.direction;
		scope_Spectrum = newOptions.spectrum;

		// Invalidate the current positioning so valueSet forces an update.
		scope_Locations = [];
		valueSet(optionsToUpdate.start || v, fireSetEvent);
	}


	// Throw an error if the slider was already initialized.
	if ( scope_Target.noUiSlider ) {
		throw new Error('Slider was already initialized.');
	}

	// Create the base element, initialise HTML and set classes.
	// Add handles and links.
	scope_Base = addSlider( options.dir, options.ort, scope_Target );

	addElements( options.handles, options.connect, options.dir, scope_Base );

	if ( options.pips ) {
		pips(options.pips);
	}

	if ( options.tooltips ) {
		tooltips();
	}

	scope_Self = {
		destroy: destroy,
		steps: getCurrentStep,
		on: bindEvent,
		off: removeEvent,
		get: valueGet,
		set: valueSet,
		updateOptions: updateOptions,
		options: originalOptions, // Issue #600
		target: scope_Target, // Issue #597
		pips: pips // Issue #594
	};

	// Attach user events.
	bindSliderEvents( options.events );

	return scope_Self;
