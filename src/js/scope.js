
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

		// Limit to 0/100 for .val input, trim anything beyond 7 digits, as
		// JavaScript has some issues in its floating point implementation.
		to = limit(parseFloat(to.toFixed(7)));

		// Return false if handle can't move
		if ( to === scope_Locations[trigger] ) {
			return false;
		}

		// Set the handle to the new position.
		// Use requestAnimationFrame for efficient painting.
		// No significant effect in Chrome, Edge sees dramatic
		// performace improvements.
		if ( window.requestAnimationFrame ) {
			window.requestAnimationFrame(function(){
				handle.style[options.style] = to + '%';
			});
		} else {
			handle.style[options.style] = to + '%';
		}

		// Force proper handle stacking
		if ( !handle.previousSibling ) {
			removeClass(handle, cssClasses[17]);
			if ( to > 50 ) {
				addClass(handle, cssClasses[17]);
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
	function valueSet ( input ) {

		var values = asArray( input ), i;

		// The RTL settings is implemented by reversing the front-end,
		// internal mechanisms are the same.
		if ( options.dir && options.handles > 1 ) {
			values.reverse();
		}

		// Animation is optional.
		// Make sure the initial values where set before using animated placement.
		if ( options.animate && scope_Locations[0] !== -1 ) {
			addClassFor( scope_Target, cssClasses[14], 300 );
		}

		setValues ( values );

		// Fire the 'set' event for both handles.
		for ( i = 0; i < scope_Handles.length; i++ ) {
			fireEvent('set', i);
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
		cssClasses.forEach(function(cls){
			if ( !cls ) { return; } // Ignore empty classes
			removeClass(scope_Target, cls);
		});
		scope_Target.innerHTML = '';
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

		var event = namespacedEvent.split('.')[0],
			namespace = namespacedEvent.substring(event.length);

		Object.keys(scope_Events).forEach(function( bind ){

			var tEvent = bind.split('.')[0],
				tNamespace = bind.substring(tEvent.length);

			if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
				delete scope_Events[bind];
			}
		});
	}

	// Updateable: margin, limit, step, range, animate, snap
	function updateOptions ( optionsToUpdate ) {

		var v = valueGet(), i, newOptions = testOptions({
			start: [0, 0],
			margin: optionsToUpdate.margin,
			limit: optionsToUpdate.limit,
			step: optionsToUpdate.step,
			range: optionsToUpdate.range,
			animate: optionsToUpdate.animate,
			snap: optionsToUpdate.snap === undefined ? options.snap : optionsToUpdate.snap
		});

		['margin', 'limit', 'step', 'range', 'animate'].forEach(function(name){
			if ( optionsToUpdate[name] !== undefined ) {
				options[name] = optionsToUpdate[name];
			}
		});

		scope_Spectrum = newOptions.spectrum;

		// Invalidate the current positioning so valueSet forces an update.
		scope_Locations = [];
		valueSet(v);

		for ( i = 0; i < scope_Handles.length; i++ ) {
			fireEvent('update', i);
		}
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
		updateOptions: updateOptions
	};

	// Attach user events.
	events( options.events );

	return scope_Self;
