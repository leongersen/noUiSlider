/**@preserve
$.fn.noUiSlider - WTFPL - refreshless.com/nouislider/ */

/*jslint browser: true */
/*jslint sub: true */
/*jslint white: true */
/*jslint continue: true */
/*jslint plusplus: true */

(function( $ ){

	'use strict';

	var
	// Cache the document selector;
	/** @const */
	doc = $(document),
	// Make a backup of the original jQuery/Zepto .val() method.
	/** @const */
	$val = $.fn.val,
	// Namespace for binding and unbinding slider events;
	/** @const */
	namespace = '.nui',
	// Determine the events to bind. IE11 implements pointerEvents without
	// a prefix, which breaks compatibility with the IE10 implementation.
	/** @const */
	actions = window.navigator['pointerEnabled'] ? {
		start: 'pointerdown',
		move: 'pointermove',
		end: 'pointerup'
	} : window.navigator['msPointerEnabled'] ? {
		start: 'MSPointerDown',
		move: 'MSPointerMove',
		end: 'MSPointerUp'
	} : {
		start: 'mousedown touchstart',
		move: 'mousemove touchmove',
		end: 'mouseup touchend'
	},
	// Re-usable list of classes;
	/** @const */
	Classes = [
/*  0 */  'noUi-target'
/*  1 */ ,'noUi-base'
/*  2 */ ,'noUi-origin'
/*  3 */ ,'noUi-handle'
/*  4 */ ,'noUi-horizontal'
/*  5 */ ,'noUi-vertical'
/*  6 */ ,'noUi-background'
/*  7 */ ,'noUi-connect'
/*  8 */ ,'noUi-ltr'
/*  9 */ ,'noUi-rtl'
/* 10 */ ,'noUi-dragable'
/* 11 */ ,''
/* 12 */ ,'noUi-state-drag'
/* 13 */ ,''
/* 14 */ ,'noUi-state-tap'
/* 15 */ ,'noUi-active'
/* 16 */ ,''
/* 17 */ ,'noUi-stacking'
	],
	/** @const */
	defaultFormatter = { 'to': function( value ){
		return value.toFixed(2);
	}, 'from': Number };


// General helpers

	// Limits a value to 0 - 100
	function limit ( a ) {
		return Math.max(Math.min(a, 100), 0);
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) {
		return Math.round(value / to) * to;
	}

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) {
		return (100 / (pb - pa));
	}

	// Removes duplicates from an array.
	function unique(array) {
		return $.grep(array, function(el, index) {
			return index === $.inArray(el, array);
		});
	}


// Type validation

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}

	// Wraps a variable as an array, if it isn't one yet.
	function asArray ( a ) {
		return $.isArray(a) ? a : [a];
	}


// Class handling

	// Sets a class and removes it after [duration] ms.
	function addClassFor ( element, className, duration ) {
		element.addClass(className);
		setTimeout(function(){
			element.removeClass(className);
		}, duration);
	}


// Value calculation

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) {
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) {
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) {
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( options, value ) {

		if ( value >= options.xVal.slice(-1)[0] ){
			return 100;
		}

		var j = 1, va, vb, pa, pb;
		while ( value >= options.xVal[j] ){
			j++;
		}

		va = options.xVal[j-1];
		vb = options.xVal[j];
		pa = options.xPct[j-1];
		pb = options.xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( options, value ) {

		// There is no range group that fits 100
		if ( value >= 100 ){
			return options.xVal.slice(-1)[0];
		}

		var j = 1, va, vb, pa, pb;
		while ( value >= options.xPct[j] ){
			j++;
		}

		va = options.xVal[j-1];
		vb = options.xVal[j];
		pa = options.xPct[j-1];
		pb = options.xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (j) Get the applicable step position.
	function getStepPoint ( options, value ) {

		var j = 1;

		// Find the proper step for rtl sliders by search in inverse direction.
		// Fixes issue #262.
		while ( (options.dir ? (100 - value) : value) >= options.xPct[j] ){
			j++;
		}

		return j;
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( options, value ){

		var j = getStepPoint( options, value ), a, b;

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( options.snap ) {

			a = options.xPct[j-1];
			b = options.xPct[j];

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !options.xSteps[j-1] ){
			return value;
		}

		return options.xPct[j-1] + closest(
			value - options.xPct[j-1],
			options.xSteps[j-1]
		);
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


// Input validation

	function testStep ( parsed, entry ) {

		if ( !isNumeric( entry ) ) {
			throw new Error("noUiSlider: 'step' is not numeric.");
		}

		// The step option can still be used to set stepping
		// for linear sliders. Overwritten if set in 'range'.
		parsed.xSteps[0] = entry;
	}

	function testRange ( parsed, entry ) {

		// Filter incorrect input.
		if ( typeof entry !== 'object' || $.isArray(entry) ) {
			throw new Error("noUiSlider: 'range' is not an object.");
		}

		// Catch missing start or end.
		if ( entry['min'] === undefined ||
				entry['max'] === undefined ) {
			throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
		}

		// Loop all entries.
		$.each( entry, function ( index, value ) {

			var percentage;

			// Wrap numerical input in an array.
			if ( typeof value === "number" ) {
				value = [value];
			}

			// Reject any invalid input.
			if ( !$.isArray( value ) ){
				throw new Error("noUiSlider: 'range' contains invalid value.");
			}

			// Covert min/max syntax to 0 and 100.
			if ( index === 'min' ) {
				percentage = 0;
			} else if ( index === 'max' ) {
				percentage = 100;
			} else {
				percentage = parseFloat( index );
			}

			// Check for correct input.
			if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
				throw new Error("noUiSlider: 'range' value isn't numeric.");
			}

			// Store values.
			parsed.xPct.push( percentage );
			parsed.xVal.push( value[0] );

			// NaN will evaluate to false too, but to keep
			// logging clear, set step explicitly. Make sure
			// not to override the 'step' setting with false.
			if ( !percentage ) {
				if ( !isNaN( value[1] ) ) {
					parsed.xSteps[0] = value[1];
				}
			} else {
				parsed.xSteps.push( isNaN(value[1]) ? false : value[1] );
			}
		});

		// Store the actual step values.
		parsed.xNumSteps = parsed.xSteps.slice(0);

		$.each(parsed.xSteps, function(i,n){

			// Ignore 'false' stepping.
			if ( !n ) {
				return true;
			}

			// Factor to range ratio
			parsed.xSteps[i] = fromPercentage([
				 parsed.xVal[i]
				,parsed.xVal[i+1]
			], n) / subRangeRatio (
				parsed.xPct[i],
				parsed.xPct[i+1] );
		});
	}

	function testStart ( parsed, entry ) {

		entry = asArray(entry);

		// Validate input. Values aren't tested, as the public .val method
		// will always provide a valid location.
		if ( !$.isArray( entry ) || !entry.length || entry.length > 2 ) {
			throw new Error("noUiSlider: 'start' option is incorrect.");
		}

		// Store the number of handles.
		parsed.handles = entry.length;

		// When the slider is initialized, the .val method will
		// be called with the start options.
		parsed.start = entry;
	}

	function testSnap ( parsed, entry ) {

		// Enforce 100% stepping within subranges.
		parsed.snap = entry;

		if ( typeof entry !== 'boolean' ){
			throw new Error("noUiSlider: 'snap' option must be a boolean.");
		}
	}

	function testConnect ( parsed, entry ) {

		if ( entry === 'lower' && parsed.handles === 1 ) {
			parsed.connect = 1;
		} else if ( entry === 'upper' && parsed.handles === 1 ) {
			parsed.connect = 2;
		} else if ( entry === true && parsed.handles === 2 ) {
			parsed.connect = 3;
		} else if ( entry === false ) {
			parsed.connect = 0;
		} else {
			throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
		}
	}

	function testOrientation ( parsed, entry ) {

		// Set orientation to an a numerical value for easy
		// array selection.
		switch ( entry ){
		  case 'horizontal':
			parsed.ort = 0;
			break;
		  case 'vertical':
			parsed.ort = 1;
			break;
		  default:
			throw new Error("noUiSlider: 'orientation' option is invalid.");
		}
	}

	function testMargin ( parsed, entry ) {

		if ( parsed.xPct.length > 2 ) {
			throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
		}

		// Parse value to range and store. As xVal is checked
		// to be no bigger than 2, use it as range.
		parsed.margin = fromPercentage(parsed.xVal, entry);

		if ( !isNumeric(entry) ){
			throw new Error("noUiSlider: 'margin' option must be numeric.");
		}
	}

	function testDirection ( parsed, entry ) {

		// Set direction as a numerical value for easy parsing.
		// Invert connection for RTL sliders, so that the proper
		// handles get the connect/background classes.
		switch ( entry ) {
		  case 'ltr':
			parsed.dir = 0;
			break;
		  case 'rtl':
			parsed.dir = 1;
			parsed.connect = [0,2,1,3][parsed.connect];
			break;
		  default:
			throw new Error("noUiSlider: 'direction' option was not recognized.");
		}
	}

	function testBehaviour ( parsed, entry ) {

		// Make sure the input is a string.
		if ( typeof entry !== 'string' ) {
			throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
		}

		// Check if the string contains any keywords.
		// None are required.
		var tap = entry.indexOf('tap') >= 0,
			drag = entry.indexOf('drag') >= 0,
			fixed = entry.indexOf('fixed') >= 0,
			snap = entry.indexOf('snap') >= 0;

		parsed.events = {
			tap: tap || snap,
			drag: drag,
			fixed: fixed,
			snap: snap
		};
	}

	function testFormat ( parsed, entry ) {

		parsed.format = entry;

		// Any object with a to and from method is supported.
		if ( typeof entry['to'] === 'function' && typeof entry['from'] === 'function' ) {
			return true;
		}

		throw new Error( "noUiSlider: 'format' requires 'to' and 'from' methods.");
	}

	// Test all developer settings and parse to assumption-safe values.
	function test ( options, sliders ){

	/*	Every input option is tested and parsed. This'll prevent
		endless validation in internal methods. These tests are
		structured with an item for every option available. An
		option can be marked as required by setting the 'r' flag.
		The testing function is provided with three arguments:
			- The provided value for the option;
			- A reference to the options object;
			- The name for the option;

		The testing function returns false when an error is detected,
		or true when everything is OK. It can also modify the option
		object, to make sure all values can be correctly looped elsewhere. */

		var parsed = {
			xPct: [],
			xVal: [],
			xSteps: [ false ],
			xNumSteps: [ false ],
			margin: 0,
			format: defaultFormatter
		}, tests;

		// Tests are executed in the order they are presented here.
		tests = {
			'step': { r: false, t: testStep },
			'start': { r: true, t: testStart },
			'connect': { r: true, t: testConnect },
			'direction': { r: true, t: testDirection },
			'range': { r: true, t: testRange },
			'snap': { r: false, t: testSnap },
			'orientation': { r: false, t: testOrientation },
			'margin': { r: false, t: testMargin },
			'behaviour': { r: true, t: testBehaviour },
			'format': { r: false, t: testFormat }
		};

		// Set defaults where applicable.
		options = $.extend({
			'connect': false,
			'direction': 'ltr',
			'behaviour': 'tap',
			'orientation': 'horizontal'
		}, options);

		// Run all options through a testing mechanism to ensure correct
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
		$.each( tests, function( name, test ){

			// If the option isn't set, but it is required, throw an error.
			if ( options[name] === undefined ) {

				if ( test.r ) {
					throw new Error("noUiSlider: '" + name + "' is required.");
				}

				return true;
			}

			test.t( parsed, options[name], sliders );
		});

		// Pre-define the styles.
		parsed.style = parsed.ort ? 'top' : 'left';

		return parsed;
	}


// DOM additions

	// Append a handle to the base.
	function addHandle ( options, index ) {

		var handle = $('<div><div/></div>').addClass( Classes[2] ),
			additions = [ '-lower', '-upper' ];

		if ( options.dir ) {
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
	function addHandles ( options, base ) {

		var index, handles = [];

		// Append handles.
		for ( index = 0; index < options.handles; index++ ) {

			// Keep a list of all added handles.
			handles.push( addHandle( options, index ).appendTo(base) );
		}

		return handles;
	}

	// Initialize a single slider.
	function addSlider ( options, target ) {

		// Apply classes and data to the target.
		target.addClass([
			Classes[0],
			Classes[8 + options.dir],
			Classes[4 + options.ort]
		].join(' '));

		return $('<div/>').appendTo(target).addClass( Classes[1] );
	}


// Legend

	function getGroup ( options, mode, values, stepped ) {

		// Use the range.
		if ( mode === 'range' || mode === 'steps' ) {
			return options.xVal;
		}

		if ( mode === 'count' ) {

			// Divide 0 - 100 in 'count' parts.
			var spread = ( 100 / (values-1) ), v, i = 0;
			values = [];

			// List these parts and have them handled as 'positions'.
			while ((v=i++*spread) <= 100 ) {
				values.push(v);
			}

			mode = 'positions';
		}

		if ( mode === 'positions' ) {

			// Map all percentages to on-range values.
			return $.map(values, function( value ){
				return fromStepping( options, stepped ? getStep(options, value) : value );
			});
		}

		if ( mode === 'values' ) {

			// If the value must be stepped, it needs to be converted to a percentage first.
			if ( stepped ) {

				return $.map(values, function( value ){

					// Convert to percentage, apply step, return to value.
					return fromStepping(options, getStep(options, toStepping(options, value)));
				});

			}

			// Otherwise, we can simply use the values.
			return values;
		}
	}

	function generateSpread ( options, density, mode, group ) {

		var indexes = {},
			firstInRange = options.xVal[0],
			lastInRange = options.xVal[options.xVal.length-1],
			ignoreFirst = false,
			ignoreLast = false,
			prevPct = 0;

		// Create a copy of the group, sort it and filter away all duplicates.
		group = unique(group.slice().sort(function(a, b){ return a - b; }));

		// Make sure the range starts with the first element.
		if ( group[0] !== firstInRange ) {
			group.unshift(firstInRange);
			ignoreFirst = true;
		}

		// Likewise for the last one.
		if ( group[group.length - 1] !== lastInRange ) {
			group.push(lastInRange);
			ignoreLast = true;
		}

		$.each(group, function ( index, value ) {

			// Get the current step and the lower + upper positions.
			var step, i, q,
				low = group[index],
				high = group[index+1],
				newPct, pctDifference, pctPos, type,
				steps, realSteps, stepsize;

			// When using 'steps' mode, use the provided steps.
			// Otherwise, we'll step on to the next subrange.
			if ( mode === 'steps' ) {
				step = options.xNumSteps[ index ];
			}

			// Default to a 'full' step.
			if ( !step ) {
				step = high-low;
			}

			// Low can be 0, so test for false. If high is undefined,
			// we are at the last subrange. Index 0 is already handled.
			if ( low === false || high === undefined ) {
				return;
			}

			// Find all steps in the subrange.
			for ( i = low; i <= high; i += step ) {

				// Get the percentage value for the current step,
				// calculate the size for the subrange.
				newPct = toStepping(options, i);
				pctDifference = newPct - prevPct;

				steps = pctDifference / density;
				realSteps = Math.round(steps);

				// This ratio represents the ammount of percentage-space a point indicates.
				// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
				// Round the percentage offset to an even number, then divide by two
				// to spread the offset on both sides of the range.
				stepsize = pctDifference/realSteps;

				// Divide all points evenly, adding the correct number to this subrange.
				// Run up to <= so that 100% gets a point, event if ignoreLast is set.
				for ( q = 1; q <= realSteps; q += 1 ) {

					// The ratio between the rounded value and the actual size might be ~1% off.
					// Correct the percentage offset by the number of points
					// per subrange. density = 1 will result in 100 points on the
					// full range, 2 for 50, 4 for 25, etc.
					pctPos = prevPct + ( q * stepsize );
					indexes[pctPos.toFixed(5)] = ['x', 0]; // todo
				}

				// Determine the point type.
				type = ($.inArray(i, group) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

				// Enforce the 'ignoreFirst' option by overwriting the type for 0.
				if ( !index && ignoreFirst && !low ) {
					type = 0;
				}

				if ( !(i === high && ignoreLast)) {
					// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
					indexes[newPct.toFixed(5)] = [i, type];
				}

				// Update the percentage count.
				prevPct = newPct;
			}
		});

		return indexes;
	}

	function addMarking ( options, spread, element, filterFunc ) {

		var style = ['horizontal', 'vertical'][options.ort];

		element.addClass('noUi-legend noUi-legend-'+style);

		function getSize( type, value ){
			return [ '-normal', '-large', '-sub' ][(type&&filterFunc) ? filterFunc(value, type) : type];
		}
		function getTags( offset, source, values ) {
			return 'class="' + source + ' ' +
				source + '-' + style + ' ' +
				source + getSize(values[1], values[0]) +
				'" style="' + options.style + ': ' + offset + '%"';
		}
		function addSpread ( offset, values ){

			// Invert the scale for rtl sliders.
			if ( options.dir ) {
				offset = 100 - offset;
			}

			// Add a marker for every point
			element.append('<div '+getTags(offset, 'noUi-marker', values)+'></div>');

			// Values are only appended for points marked '1' or '2'.
			if ( values[1] ) {
				element.append('<div '+getTags(offset, 'noUi-value', values)+'>' + Math.round(values[0]) + '</div>');
			}
		}

		// Append all points.
		$.each(spread, addSpread);
	}


// Slider scope

function closure ( target, options, originalOptions ){

// Internal variables

	// All variables local to 'closure' are marked $.
	var $Target = $(target),
		$Locations = [-1, -1],
		$Base,
		$Handles,
		$Values = [],
	// libLink
		triggerPos = ['lower', 'upper'];

	// Invert the libLink connection for rtl sliders.
	if ( options.dir ) {
		triggerPos.reverse();
	}


// Helpers

	// Shorthand for base dimensions.
	function baseSize ( ) {
		return $Base[['width', 'height'][options.ort]]();
	}

	// External event handling
	function fireEvents ( events ) {

		// Use the external api to get the values.
		// Wrap the values in an array, as .trigger takes
		// only one additional argument.
		var index, values = [ $Target.val() ];

		for ( index = 0; index < events.length; index++ ){
			$Target.trigger(events[index], values);
		}
	}

	// Check if the range is effectively 0.
	function isNullRange ( ) {
		return options.xVal.length === 2 && options.xVal[0] === options.xVal[1];
	}

	// Returns the input array, respecting the slider direction configuration.
	function inSliderOrder ( values ) {

		// If only one handle is used, return a single value.
		if ( values.length === 1 ){
			return values[0];
		}

		if ( options.dir ) {
			return values.reverse();
		}

		return values;
	}


// libLink integration

	// Create a new function which calls .val on input change.
	function createChangeHandler ( trigger ) {
		return function ( ignore, value ){
			// Determine which array position to 'null' based on 'trigger'.
			$Target.val( [ trigger ? null : value, trigger ? value : null ], true );
		};
	}

	// Called by libLink when it wants a set of links updated.
	function LinkUpdate ( flag ) {
		// The API might not have been set yet.

		var trigger = $.inArray(flag, triggerPos);

		try {
			$Target[0].linkAPI[flag].change(
				$Values[trigger],
				$Handles[trigger].children(),
				$Target
			);
		} catch ( ignore ) { }
	}

	// Called by libLink to append an element to the slider.
	function LinkConfirm ( flag, element ) {

		// Find the trigger for the passed flag.
		var trigger = $.inArray(flag, triggerPos);

		// If set, append the element to the handle it belongs to.
		if ( element ) {
			element.appendTo( $Handles[trigger].children() );
		}

		// The public API is reversed for rtl sliders, so the changeHandler
		// should not be aware of the inverted trigger positions.
		if ( options.dir ) {
			trigger = trigger === 1 ? 0 : 1;
		}

		return createChangeHandler( trigger );
	}

	/** @expose */
	target.LinkUpdate = LinkUpdate;
	/** @expose */
	target.LinkConfirm = LinkConfirm;
	/** @expose */
	target.LinkDefaultFlag = 'lower';
	/** @expose */
	target.LinkDefaultFormatter = options.format;


// Handle placement

	// Test suggested values and apply margin, step.
	function setHandle ( handle, to ) {

		var trigger = handle[0] !== $Handles[0][0] ? 1 : 0,
			lower = $Locations[0] + options.margin,
			upper = $Locations[1] - options.margin;

		// Check if the slider has no range. If so, lock in the center.
		if ( isNullRange() ) {

			to = 50;

		} else {

			// For sliders with multiple handles,
			// limit movement to the other handle.
			if ( $Handles.length > 1 ) {
				to = trigger ? Math.max( to, lower ) : Math.min( to, upper );
			}

			// Handle the step option.
			if ( to < 100 ){
				to = getStep(options, to);
			}

			// Limit to 0/100 for .val input, trim anything beyond 7 digits, as
			// JavaScript has some issues in its floating point implementation.
			to = limit(parseFloat(to.toFixed(7)));

			// Return false if handle can't move.
			if ( to === $Locations[trigger] ) {
				return false;
			}
		}

		// Set the handle to the new position.
		handle.css( options.style, to + '%' );

		// Force proper handle stacking
		if ( handle.is(':first-child') ) {
			handle.toggleClass(Classes[17], to > 50 );
		}

		// Update locations.
		$Locations[trigger] = to;

		// Invert the value if this is a right-to-left slider.
		if ( options.dir ) {
			to = 100 - to;
		}

		// Convert the value to the slider stepping/range.
		$Values[trigger] = fromStepping( options, to );

		LinkUpdate(triggerPos[trigger]);

		return true;
	}

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

	// Handles movement by tapping.
	function jump ( handle, to, instant ) {

		if ( !instant ) {
			// Flag the slider as it is now in a transitional state.
			// Transition takes 300 ms, so re-enable the slider afterwards.
			addClassFor( $Target, Classes[14], 300 );
		}

		// Move the handle to the new position.
		setHandle( handle, to );

		fireEvents(['slide', 'set', 'change']);
	}

	// Loop values from value method and apply them.
	function setValues ( count, values ) {

		var i, trigger, to;

		// If there are multiple handles to be set run the setting
		// mechanism twice for the first handle, to make sure it
		// can be bounced of the second one properly.
		for ( i = 0; i < count; i++ ) {

			trigger = i%2;

			// Get the current argument from the array.
			to = values[trigger];

			// Setting with null indicates an 'ignore'.
			if ( to === null ) {
				continue;
			}

			// If a formatted number was passed, attemt to decode it.
			if ( typeof to === 'number' ) {
				to = String(to);
			}

			to = options.format.from( to );

			// Request an update for all links if the value was invalid.
			if ( to === false || isNaN(to) ) {
				LinkUpdate(triggerPos[trigger]);
				continue;
			}

			// Calculate the new handle position
			to = toStepping( options, to );

			// Invert the value if this is a right-to-left slider.
			if ( options.dir ) {
				to = 100 - to;
			}

			// Set the handle.
			setHandle( $Handles[trigger], to );
		}
	}


// Events

	// Handler for attaching events trough a proxy.
	function attach ( events, element, callback, data ) {

		// This function can be used to 'filter' events to the slider.

		// Add the noUiSlider namespace to all events.
		events = events.replace( /\s/g, namespace + ' ' ) + namespace;

		// Bind a closure on the target.
		return element.on( events, function( e ){

			// jQuery and Zepto (1) handle unset attributes differently,
			// but always falsy; #208
			if ( !!$Target.attr('disabled') ) {
				return false;
			}

			// Stop if an active 'tap' transition is taking place.
			if ( $Target.hasClass( Classes[14] ) ) {
				return false;
			}

			// Ignore all events if the range is effectively 0. #236
			if ( isNullRange() ) {
				return false;
			}

			e = fixEvent(e);
			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with the event [ and additional data ].
			callback ( e, data );
		});
	}

	// Handle movement on document for handle and range drag.
	function move ( event, data ) {

		var handles = data.handles || $Handles, positions, state = false,
			proposal = ((event.calcPoint - data.start) * 100) / baseSize(),
			h = handles[0][0] !== $Handles[0][0] ? 1 : 0;

		// Calculate relative positions for the handles.
		positions = getPositions( proposal, data.positions, handles.length > 1);

		state = setHandle ( handles[0], positions[h] );

		if ( handles.length > 1 ) {
			state = setHandle ( handles[1], positions[h?0:1] ) || state;
		}

		// Fire the 'slide' event if any handle moved.
		if ( state ) {
			fireEvents(['slide']);
		}
	}

	// Unbind move events on document, call callbacks.
	function end ( event ) {

		// The handle is no longer active, so remove the class.
		$('.' + Classes[15]).removeClass(Classes[15]);

		// Remove cursor styles and text-selection events bound to the body.
		if ( event.cursor ) {
			$('body').css('cursor', '').off( namespace );
		}

		// Unbind the move and end events, which are added on 'start'.
		doc.off( namespace );

		// Remove dragging class.
		$Target.removeClass(Classes[12]);

		// Fire the change and set events.
		fireEvents(['set', 'change']);
	}

	// Bind move events on document.
	function start ( event, data ) {

		// Mark the handle as 'active' so it can be styled.
		if( data.handles.length === 1 ) {
			data.handles[0].children().addClass(Classes[15]);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Attach the move event.
		attach ( actions.move, doc, move, {
			start: event.calcPoint,
			handles: data.handles,
			positions: [
				$Locations[0],
				$Locations[$Handles.length - 1]
			]
		});

		// Unbind all movement when the drag ends.
		attach ( actions.end, doc, end, null );

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			$('body').css('cursor', $(event.target).css('cursor'));

			// Mark the target with a dragging state.
			if ( $Handles.length > 1 ) {
				$Target.addClass(Classes[12]);
			}

			// Prevent text selection when dragging the handles.
			$('body').on('selectstart' + namespace, false);
		}
	}

	// Move closest handle to tapped location.
	function tap ( event ) {

		var location = event.calcPoint, total = 0, to;

		// The tap event shouldn't propagate up and cause 'edge' to run.
		event.stopPropagation();

		// Add up the handle offsets.
		$.each( $Handles, function(){
			total += this.offset()[ options.style ];
		});

		// Find the handle closest to the tapped position.
		total = ( location < total/2 || $Handles.length === 1 ) ? 0 : 1;

		location -= $Base.offset()[ options.style ];

		// Calculate the new position.
		to = ( location * 100 ) / baseSize();

		// Find the closest handle and calculate the tapped point.
		// The set handle to the new position.
		jump( $Handles[total], to, options.events.snap );

		if ( options.events.snap ) {
			start(event, { handles: [$Handles[total]] });
		}
	}

	// Move handle to edges when target gets tapped.
	function edge ( event ) {

		var i = event.calcPoint < $Base.offset()[ options.style ],
			to = i ? 0 : 100;

		i = i ? 0 : $Handles.length - 1;

		jump( $Handles[i], to, false );
	}

	// Attach events to several slider parts.
	function events ( behaviour ) {

		var i, drag;

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			for ( i = 0; i < $Handles.length; i++ ) {

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attach ( actions.start, $Handles[i].children(), start, {
					handles: [ $Handles[i] ]
				});
			}
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {

			attach ( actions.start, $Base, tap, {
				handles: $Handles
			});

			// Extend tapping behaviour to target
			attach ( actions.start, $Target, edge, {
				handles: $Handles
			});
		}

		// Make the range dragable.
		if ( behaviour.drag ){

			drag = $Base.find( '.' + Classes[7] ).addClass( Classes[10] );

			// When the range is fixed, the entire range can
			// be dragged by the handles. The handle in the first
			// origin will propagate the start event upward,
			// but it needs to be bound manually on the other.
			if ( behaviour.fixed ) {
				drag = drag.add($Base.children().not( drag ).children());
			}

			attach ( actions.start, drag, start, {
				handles: $Handles
			});
		}
	}


// Initialize slider

	// Throw an error if the slider was already initialized.
	if ( $Target.hasClass(Classes[0]) ) {
		throw new Error('Slider was already initialized.');
	}

	// Create the base element, initialise HTML and set classes.
	// Add handles and links.
	$Base = addSlider( options, $Target );
	$Handles = addHandles( options, $Base );

	// Set the connect classes.
	addConnection ( options.connect, $Target, $Handles );

	// Attach user events.
	events( options.events );


// Methods

	// Set the slider value.
	/** @expose */
	target.vSet = function ( ) {

		var args = Array.prototype.slice.call( arguments ),
			count, values = asArray( args[0] );

		// Support the 'true' option.
		if ( args[1] === true ) {
			args[1] = { 'set': true };
		} else if ( typeof args[1] !== 'object' ) {
			args[1] = {};
		}

		// The RTL settings is implemented by reversing the front-end,
		// internal mechanisms are the same.
		if ( options.dir && options.handles > 1 ) {
			values.reverse();
		}

		// Animation is optional.
		if ( args[1]['animate'] ) {
			addClassFor( $Target, Classes[14], 300 );
		}

		// Determine how often to set the handles.
		count = $Handles.length > 1 ? 3 : 1;

		if ( values.length === 1 ) {
			count = 1;
		}

		setValues ( count, values );

		// Optionally fire the 'set' event.
		if ( args[1]['set'] === true ) {
			fireEvents(['set']);
		}

		return this;
	};

	// Get the slider value.
	/** @expose */
	target.vGet = function ( ) {

		var i, retour = [];

		// Get the value from all handles.
		for ( i = 0; i < options.handles; i++ ){
			retour[i] = options.format.to( $Values[i] );
		}

		return inSliderOrder( retour );
	};

	// Destroy the slider and unbind all events.
	/** @expose */
	target.destroy = function ( ) {

		// Unbind events on the slider, remove all classes and child elements.
		$(this).off(namespace)
			.removeClass(Classes.join(' '))
			.empty();

		// Return the original options from the closure.
		return originalOptions;
	};

	// Place elements back on the slider.
	/** @expose */
	target.reappend = function ( ) {

		// The API keeps a list of elements: we can re-append them on rebuild.
		$.each(this.linkAPI, function( trigger, elements ){
			$.each(elements, function( ignore, element ) {
				element.appendTo( $Handles[trigger].children() );
			});
		});
	};

	// Get the current step size for the slider.
	/** @expose */
	target.getStep = function ( ) {

		// Check all locations, map them to their stepping point.
		var retour = $.map($Locations, function( value ){
			// Get the step point, then find it in the input list.
			return options.xNumSteps[getStepPoint(options, value) - 1];
		});

		// Return values in the proper order.
		return inSliderOrder( retour );
	};

	// Create a legend for a slider.
	/** @expose */
	target.createLegend = function ( grid ) {

	var mode = grid['mode'],
		element = grid['element'],
		density = grid['density'] || 1,
		filter = grid['filter'] || false,
		values = grid['values'] || false,
		stepped = grid['stepped'] || false,

		group = getGroup( options, mode, values, stepped ),
		spread = generateSpread( options, density, mode, group );

		addMarking(
			options,
			spread,
			element,
			filter
		);
	};

	// Use the public value method to set the start values.
	$Target.val( options.start );
}


// Access points

	// Run the standard initializer
	function initialize ( originalOptions ) {

		// Throw error if group is empty.
		if ( !this.length ){
			throw new Error("noUiSlider: Can't initialize slider on empty selection.");
		}

		// Test the options once, not for every slider.
		var options = test( originalOptions, this );

		// Loop all items, and provide a new closed-scope environment.
		return this.each(function(){
			closure(this, options, originalOptions);
		});
	}

	// Destroy the slider, then re-enter initialization.
	function rebuild ( options ) {

		return this.each(function(){

			// Get the current values from the slider,
			// including the initialization options.
			var values = $(this).val(),
				originalOptions = this.destroy(),

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
	$.fn.val = function ( ) {

		// this === instanceof $

		function valMethod( a ){
			return a.hasClass(Classes[0]) ? value : $val;
		}

		var args = arguments,
			first = $(this[0]);

		if ( !arguments.length ) {
			return valMethod(first).call(first);
		}

		// Return the set so it remains chainable
		return this.each(function(){
			valMethod($(this)).apply($(this), args);
		});
	};

// Extend jQuery/Zepto with the noUiSlider method.
	/** @expose */
	$.fn.noUiSlider = function ( options, rebuildFlag ) {

		if ( options === 'legend' ) {
			return this[0].createLegend.apply(this[0], Array.prototype.slice.call(arguments, 1));
		}

		return ( rebuildFlag ? rebuild : initialize ).call(this, options);
	};

}( window['jQuery'] || window['Zepto'] ));
