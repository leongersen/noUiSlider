
	// Test suggested values and apply margin, step.
	function setHandle ( handle, to, noLimitOption ) {

		var trigger;
		for (trigger = 0 ; scope_Handles[trigger] !== handle ; trigger++) { }

		var lowerMargin = scope_Locations[trigger-1] + options.margin,
			upperMargin = scope_Locations[trigger+1] - options.margin,
			lowerLimit = scope_Locations[trigger-1] + options.limit,
			upperLimit = scope_Locations[trigger+1] - options.limit;

		// For sliders with multiple handles,
		// limit movement to the other handle.
		// Apply the margin option by adding it to the handle positions.
		to = Math.min(Math.max(to, isNaN(lowerMargin)?0:lowerMargin), isNaN(upperMargin)?100:upperMargin);

		// The limit option has the opposite effect, limiting handles to a
		// maximum distance from another. Limit must be > 0, as otherwise
		// handles would be unmoveable. 'noLimitOption' is set to 'false'
		// for the .val() method, except for pass 4/4.
		if ( noLimitOption !== false && options.limit && scope_Handles.length > 1 ) {
			to = trigger ? Math.min ( to, lowerLimit ) : Math.max( to, upperLimit );
		}

		// Handle the step option.
		to = scope_Spectrum.getStep( to );

		// Limit percentage to the 0 - 100 range
		to = limit(to);

		// Return false if handle can't move
		if ( to === scope_Locations[trigger] ) {
			return false;
		}

		// Set the handle to the new position.
		// Use requestAnimationFrame for efficient painting.
		// No significant effect in Chrome, Edge sees dramatic
		// performace improvements.
		// Option to disable is useful for unit tests, and single-step debugging.
		if ( window.requestAnimationFrame && options.useRequestAnimationFrame ) {
			window.requestAnimationFrame(function(){
				handle.style[options.style] = to + '%';
			});
		} else {
			handle.style[options.style] = to + '%';
		}

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
				var otherZIndex = parseInt( allHandles[i].childNodes[0].style.zIndex ) || 0;
				// If the other handle's inner div is above the current handle's inner div before the z-index update,
				// then take a step down.
				if ( otherZIndex > zIndex ) {
					allHandles[i].childNodes[0].style.zIndex = ( otherZIndex - 1 ).toString();
				}
			}
		}

		// Update locations.
		scope_Locations[trigger] = to;

		// Convert the value to the slider stepping/range.
		scope_Values[trigger] = scope_Spectrum.fromStepping( to );

		fireEvent('update', trigger);

		return true;
	}

	// Loop values from value method and apply them.
	function setValues ( values ) {

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

			// Setting with null indicates an 'ignore'.
			// Inputting 'false' is invalid.
			if ( to !== null && to !== false ) {

				// If a formatted number was passed, attemt to decode it.
				if ( typeof to === 'number' ) {
					to = String(to);
				}

				to = options.format.from( to );

				// Request an update for all links if the value was invalid.
				// Do so too if setting the handle fails.
				if ( to === false || isNaN(to) || setHandle( scope_Handles[trigger], scope_Spectrum.toStepping( to ), isLimitingPass) === false ) {
					fireEvent('update', trigger);
				}
			}
		}
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

	function topStepOfRangeBelow(nearbySteps) {
		var numStepsInRangeBelow = (nearbySteps.thisStep.xVal-nearbySteps.stepBefore.xVal)/nearbySteps.stepBefore.xNumSteps,
		highestCompleteStep = Math.ceil(Number(numStepsInRangeBelow.toFixed(3))-1),
		stepBelow = nearbySteps.stepBefore.xVal + nearbySteps.stepBefore.xNumSteps*highestCompleteStep;
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
	scope_Handles = addHandles( options.handles, options.dir, scope_Base );

	// Set the connect classes.
	addConnection ( options.connect, scope_Target, scope_Handles );

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
	events( options.events );

	return scope_Self;
