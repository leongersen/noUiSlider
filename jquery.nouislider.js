/*! $.noUiSlider
 @version 5.0.0
 @author Leon Gersen https://twitter.com/LeonGersen
 @license WTFPL http://www.wtfpl.net/about/
 @documentation http://refreshless.com/nouislider/
*/

// ==ClosureCompiler==
// @externs_url http://refreshless.com/externs/jquery-1.8.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// ==/ClosureCompiler==

// todo
// window.jQuery
// window.Zepto
// $.zepto
// $.zepto.isZ
// window.navigator.pointerEnabled
// window.navigator.msPointerEnabled

/*jshint laxcomma: true */
/*jshint smarttabs: true */
/*jshint sub: true */

/*jslint browser: true */
/*jslint plusplus: true */
/*jslint white: true */
/*jslint sub: true */

(function( $ ){

	'use strict';

	if ( $.zepto && !$.fn.removeData ) {
		throw new ReferenceError('Zepto is loaded without the data module.');
	}

	var
	// Cache the document selector;
	 doc = $(document)
	// Namespace for binding and unbinding slider events;
	,namespace = '.nui'
	// Copy of the current value function;
	,$VAL = $.fn.val
	// Determine the events to bind. IE11 implements pointerEvents without
	// a prefix, which breaks compatibility with the IE10 implementation.
	,actions = window.navigator.pointerEnabled ? {
		 start: 'pointerdown'
		,move: 'pointermove'
		,end: 'pointerup'
	} : window.navigator.msPointerEnabled ? {
		 start: 'MSPointerDown'
		,move: 'MSPointerMove'
		,end: 'MSPointerUp'
	} : {
		 start: 'mousedown touchstart'
		,move: 'mousemove touchmove'
		,end: 'mouseup touchend'
	}
	// Re-usable list of classes;
	,clsList = [
	/*  0 */  'noUi-base'
	/*  1 */ ,'noUi-origin'
	/*  2 */ ,'noUi-handle'
	/*  3 */ ,''
	/*  4 */ ,'noUi-active'
	/*  5 */ ,'noUi-state-tap'
	/*  6 */ ,'noUi-target'
	/*  7 */ ,'-lower'
	/*  8 */ ,'-upper'
	/*  9 */ ,'noUi-connect'
	/* 10 */ ,'noUi-horizontal'
	/* 11 */ ,'noUi-vertical'
	/* 12 */ ,'noUi-background'
	/* 13 */ ,'noUi-stacking'
	/* 14 */ ,'noUi-block'
	/* 15 */ ,'noUi-state-blocked'
	/* 16 */ ,'noUi-ltr'
	/* 17 */ ,'noUi-rtl'
	/* 18 */ ,'noUi-dragable'
	/* 19 */ ,'noUi-extended'
	/* 20 */ ,'noUi-state-drag'
	];


/* Type tests
 */

	// Test in an object is an instance of jQuery or Zepto.
	function isInstance ( a ) {
		return a instanceof $ || ( $.zepto && $.zepto.isZ(a) );
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return !isNaN( parseFloat( a ) ) && isFinite( a );
	}


/* Serialization
 */

	// Exposed access point for serialization
	function Link( target, method, decimals, mark ){

		// Rescope this so it can be used in the 'change' closure.
		var me = this;

		this.decimals = decimals;
		this.mark = mark;

		this.obj = false;

		switch ( typeof target ) {

		case 'string':

			this.target = $([]);
			this.method = 'val';

			this.el = document.createElement('input');
			this.el.name = target;
			this.el.type = 'hidden';

			return;

		case 'function':

			this.target = $([]);
			this.method = target;
			this.isFunction = true;

			return;

		case isInstance(target) && 'object':

			this.target = target;
			this.method = method || 'val';

			if ( !method ) {
				this.target.on('change' + namespace, function(){
					var a = [null,null];
					a[me.N] = $(this).val();
					me.obj.val(a);
				});
			}

			return;
		}

		throw new RangeError('Invalid Link');
	}
	Link.prototype.write = function ( value, slider ) {

		value = this.format( value );

		if ( this.isFunction ) {
			this.method.call( this.obj, value, slider );
		} else {
			this.target[ this.method ]( value );
		}
	};
	Link.prototype.format = function ( value ) {

		// Round the value to the resolution that was set
		// with the serialization options.
		value = value.toFixed( this.decimals );

		// Rounding away decimals might cause a value of -0
		// when using very small ranges. Remove those cases.
		if ( parseFloat(value) === 0 ) {
			value = value.replace('-0', '0');
		}

		// Apply the proper decimal mark to the value.
		return value.replace( '.', this.mark );
	};
	Link.prototype.validate = function ( ) {

		this.decimals = parseInt(this.decimals, 10);

		if (!(this.decimals >= 0 && this.decimals <= 20)) {
			this.decimals = 2;
		}

		if ( this.mark !== ',' ) {
			this.mark = '.';
		}

		return this;
	};
	Link.prototype.data = function ( ) {
		return $.fn.data.apply(this.target, arguments);
	};


/* Percentage calculation
 */

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


/* General helper functions
 */

	// Test an array of objects, and calls them if they are a function.
	function call ( functions, scope ) {

		// Allow the passing of an unwrapped function.
		// Leaves other code a more comprehensible.
		if( !$.isArray( functions ) ){
			functions = [ functions ];
		}

		$.each( functions, function(){
			if (typeof this === 'function') {
				this.call(scope);
			}
		});
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ){
		return Math.round(value / to) * to;
	}

	// Determine the handle closest to an event.
	function closestHandle ( handles, location ) {

		var style = handles[0].data('options').style;

		if ( handles.length === 1 ) {
			return handles[0];
		}

		var total = handles[0].offset()[style] +
					handles[1].offset()[style];

		return handles[ location < total / 2 ? 0 : 1 ];
	}

	// Round away small numbers in floating point implementation.
	function digits ( value, round ) {
		return parseFloat(value.toFixed(round));
	}


/* Event abstraction
 */

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

		return $.extend( event, {
			 points: [x, y]
			,size: [ 'width', 'height' ]
			,cursor: mouse
		});
	}

	// Handler for attaching events trough a proxy
	function attach ( events, element, callback, pass ) {

		var target = pass.target;

		// Add the noUiSlider namespace to all events.
		events = events.replace( /\s/g, namespace + ' ' ) + namespace;

		// Bind a closure on the target.
		return element.on( events, function( e ){

			// jQuery and Zepto handle unset attributes differently.
			var disabled = target.attr('disabled');
				disabled = !( disabled === undefined || disabled === null );

			// Test if there is anything that should prevent an event
			// from being handled, such as a disabled state or an active
			// 'tap' transition.
			if( target.hasClass( clsList[5] ) || disabled ) {
				return false;
			}

			// Call the event handler with three arguments:
			// - The event;
			// - An object with data for the event;
			// - The slider options;
			// Having the slider options as a function parameter prevents
			// getting it in every function, which muddies things up.
			callback (
				 fixEvent( e )
				,pass
				,target.data('base').data('options')
			);
		});
	}


/* Serialization and value storage
 */

	// Store a value on all serialization targets, or get the current value.
	function serialize ( a ) {

		/*jshint validthis: true */

		// Re-scope target for availability within .each;
		var target = this.target;

		// Get the value for this handle
		if ( a === undefined ) {
			return this.element.data('value');
		}

		// Write the value to all serialization objects
		// or store a new value on the handle
		if ( a === true ) {
			a = Number(this.element.data('value'));
		} else {
			this.element.data('value', this.element.format(a));
		}

		// Prevent a serialization call if the value wasn't initialized.
		if ( a === undefined ) {
			return;
		}

		// If the provided element was a function,
		// call it with the slider as scope. Otherwise,
		// simply call the function on the object.
		$.each( this.elements, function() {
			this.write( a, target );
		});
	}


/* Handle placement
 */

	// Fire callback on unsuccessful handle movement.
	function block ( base, stateless ) {

		var target = base.data('target');

		if ( !target.hasClass(clsList[14]) ){

			// The visual effects should not always be applied.
			if ( !stateless ) {
				target.addClass(clsList[15]);
				setTimeout(function(){
					target.removeClass(clsList[15]);
				}, 450);
			}

			target.addClass(clsList[14]);
			call( base.data('options').block, target );
		}
	}

	// Change inline style and apply proper classes.
	function placeHandle ( handle, to ) {

		var options = handle.data('options');

		to = digits(to, 7);

		// If the slider can move, remove the class
		// indicating the block state.
		handle.data('target').removeClass(clsList[14]);

		// Set handle to new location
		handle.css( options.style, to + '%' ).data('pct', to);

		// Force proper handle stacking
		if ( handle.is(':first-child') ) {
			handle.toggleClass(clsList[13], to > 50 );
		}

		if ( options.dir ) {
			to = 100 - to;
		}

		// Write the value to the serialization object.
		handle.data('store').val( isPercentage( options.range, to ) );
	}

	// Test suggested values and apply margin, step.
	function setHandle ( handle, to ) {

		var base = handle.data('base'), options = base.data('options'),
			handles = base.data('handles'), lower = 0, upper = 100;

		// Catch invalid user input
		if ( !isNumeric( to ) ){
			return false;
		}

		// Handle the step option.
		if ( options.step ){
			to = closest(to, options.step);
		}

		if ( handles.length > 1 ){
			if ( handle[0] !== handles[0][0] ) {
				lower = digits(handles[0].data('pct') + options.margin, 7);
			} else {
				upper = digits(handles[1].data('pct') - options.margin, 7);
			}
		}

		// Limit position to boundaries. When the handles aren't set yet,
		// they return -1 as a percentage value.
		to = Math.min( Math.max( to, lower ), upper < 0 ? 100 : upper );

		// Stop handling this call if the handle can't move past another.
		// Return an array containing the hit limit, so the caller can
		// provide feedback. ( block callback ).
		if ( to === handle.data('pct') ) {
			return [!lower ? false : lower, upper === 100 ? false : upper];
		}

		placeHandle ( handle, to );
		return true;
	}

	// Handles movement by tapping
	function jump ( base, handle, to, options ) {

		// Flag the slider as it is now in a transitional state.
		// Transition takes 300 ms, so re-enable the slider afterwards.
		base.addClass(clsList[5]);
		setTimeout(function(){
			base.removeClass(clsList[5]);
		}, 300);

		// Move the handle to the new position.
		setHandle( handle, to );

		// Trigger the 'slide' and 'set' callbacks,
		// pass the target so that it is 'this'.
		call( [options.slide, options.set], base.data('target') );

		base.data('target').change();
	}


/* Event handlers
 */

	// Handle movement on document for handle and range drag.
	function move ( event, Dt, options ) {

		// Map event movement to a slider percentage.
		var handles = Dt.handles, limits,
			proposal = event.points[ options.ort ] - Dt.start.points[ options.ort ];

		proposal = ( proposal * 100 ) / Dt.base[event.size[options.ort]]();

		if ( handles.length === 1 ) {

			// Run handle placement, receive true for success or an
			// array with potential limits.
			limits = setHandle( handles[0], Dt.positions[0] + proposal );

			if ( limits !== true ) {

				if ( $.inArray ( handles[0].data('pct'), limits ) >= 0 ){
					block ( Dt.base, !options.margin );
				}
				return;
			}

		} else {

			// Dragging the range could be implemented by forcing the
			// 'move' event on both handles, but this solution proved
			// lagging on slower devices, resulting in range errors. The
			// slightly ugly solution below is considerably faster, and
			// it can't move the handle out of sync. Bypass the standard
			// setting method, as other checks are needed.

			var l1, u1, l2, u2;

			// Round the proposal to the step setting.
			if ( options.step ) {
				proposal = closest(proposal, options.step);
			}

			// Determine the new position, store it twice. Once for
			// limiting, once for checking whether placement should occur.
			l1 = l2 = Dt.positions[0] + proposal;
			u1 = u2 = Dt.positions[1] + proposal;

			// Round the values within a sensible range.
			if ( l1 < 0 ) {
				u1 += -1 * l1;
				l1 = 0;
			} else if ( u1 > 100 ) {
				l1 -= ( u1 - 100 );
				u1 = 100;
			}

			// Don't perform placement if no handles are to be changed.
			// Check if the lowest value is set to zero.
			if ( l2 < 0 && !l1 && !handles[0].data('pct') ) {
				return;
			}
			// The highest value is limited to 100%.
			if ( u1 === 100 && u2 > 100 && handles[1].data('pct') === 100 ){
				return;
			}

			placeHandle ( handles[0], l1 );
			placeHandle ( handles[1], u1 );
		}

		// Trigger the 'slide' event, if the handle was moved.
		call( options.slide, Dt.target );
	}

	// Unbind move events on document, call callbacks.
	function end ( event, Dt, options ) {

		// The handle is no longer active, so remove the class.
		if ( Dt.handles.length === 1 ) {
			Dt.handles[0].data('grab').removeClass(clsList[4]);
		}

		// Remove cursor styles and text-selection events bound to the body.
		if ( event.cursor ) {
			$('body').css('cursor', '').off( namespace );
		}

		// Unbind the move and end events, which are added on 'start'.
		doc.off( namespace );

		// Trigger the change event.
		Dt.target.removeClass( clsList[14] +' '+ clsList[20]).change();

		// Trigger the 'end' callback.
		call( options.set, Dt.target );
	}

	// Bind move events on document.
	function start ( event, Dt ) {

		// Mark the handle as 'active' so it can be styled.
		if( Dt.handles.length === 1 ) {
			Dt.handles[0].data('grab').addClass(clsList[4]);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Attach the move event.
		attach ( actions.move, doc, move, {
			 start: event
			,base: Dt.base
			,target: Dt.target
			,handles: Dt.handles
			,positions: [
				Dt.handles[0].data('pct'),
				Dt.handles[Dt.handles.length - 1].data('pct')
			]
		});

		// Unbind all movement when the drag ends.
		attach ( actions.end, doc, end, {
			 target: Dt.target
			,handles: Dt.handles
		});

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			$('body').css('cursor', $(event.target).css('cursor'));

			// Mark the target with a dragging state.
			if ( Dt.handles.length > 1 ) {
				Dt.target.addClass(clsList[20]);
			}

			// Prevent text selection when dragging the handles.
			$('body').on('selectstart' + namespace, function( ){
				return false;
			});
		}
	}

	// Move closest handle to tapped location.
	function tap ( event, Dt, options ) {

		var handle, point = event.points[ options.ort ],
			to = ( point - Dt.base.offset()[ options.style ] ) * 100,
			size = Dt.base[event.size[ options.ort ]]();

		// The tap event shouldn't propagate up to trigger 'edge'.
		event.stopPropagation();

		// Find the closest handle and calculate the tapped point.
		handle = closestHandle( Dt.base.data('handles'), point );

		// The set handle to the new position.
		jump( Dt.base, handle, to / size , options );
	}

	// Move handle to edges when target gets tapped.
	function edge ( event, Dt, options ) {

		var handles = Dt.base.data('handles'),
			i = event.points[ options.ort ] < Dt.base.offset()[ options.style ],
			to = i ? 0 : 100;

		i = i ? 0 : handles.length - 1;

		jump( Dt.base, handles[i], to, options );
	}


/* API
 */

	// Validate and standardize input.
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

		function values ( a ) {

			if ( a.length !== 2 ){
				return false;
			}

			// Convert the array to floats
			a = [ parseFloat(a[0]), parseFloat(a[1]) ];

			// Test if all values are numerical
			if( !isNumeric(a[0]) || !isNumeric(a[1]) ){
				return false;
			}

			// The lowest value must really be the lowest value.
			if( a[1] < a[0] ){
				return false;
			}

			return a;
		}

		var parsed = {}, tests = {
			 'handles': {
				 r: true
				,t: function( q ){
					parsed.handles = q = parseInt(q, 10);
					return ( q === 1 || q === 2 );
				}
			}
			,'range': {
				 r: true
				,t: function( q ){

					parsed.range = values(q);

					// The values can't be identical.
					return parsed.range && parsed.range[0] !== parsed.range[1];
				}
			 }
			,'start': {
				 r: true
				,t: function( q ){
					if ( parsed.handles === 1 ){
						if( $.isArray(q) ){
							q = q[0];
						}
						q = parseFloat(q);
						parsed.start = [q];
						return isNumeric(q);
					}
					parsed.start = values(q);
					return !!parsed.start;
				}
			}
			,'connect': {
				 r: true
				,t: function( q ){

					if ( q === 'lower' ) {
						parsed.connect = 1;
					} else if ( q === 'upper' ) {
						parsed.connect = 2;
					} else if ( q === true ) {
						parsed.connect = 3;
					} else if ( q === false ) {
						parsed.connect = 0;
					} else {
						return false;
					}

					return true;
				}
			}
			,'orientation': {
				 t: function( q ){
					switch ( q ){
						case 'horizontal':
							parsed.ort = 0;
							break;
						case 'vertical':
							parsed.ort = 1;
							break;
						default: return false;
					}
					return true;
				}
			}
			,'margin': {
				 r: true
				,t: function( q ){
					q = parseFloat(q);
					parsed.margin = fromPercentage(parsed.range, q);
					return isNumeric(q);
				}
			}
			,'direction': {
				 r: true
				,t: function( q ){

					switch ( q ) {
						case 'ltr': parsed.dir = 0;
							break;
						case 'rtl': parsed.dir = 1;
							// Invert connection for RTL sliders;
							parsed.connection = [0,2,1,3][parsed.connect];
							break;
						default:
							return false;
					}

					return true;
				}
			}
			,'behaviour': {
				 r: true
				,t: function( q ){

					parsed.events = {
						 tap: q.indexOf('tap') >= 0
						,extend: q.indexOf('extend') >= 0
						,drag: q.indexOf('drag') >= 0
						,fixed: q.indexOf('fixed') >= 0
					};

					return true;
				}
			}
			,'serialization': {
				 r: true
				,t: function( q, sliders ){

					var status = true;

					parsed.ser = [ q['lower'], q['upper'] ];

					$.each( parsed.ser, function( i, a ){

						if ( !$.isArray(a) ) {
							status = false;
							return false;
						}

						$.each(a, function(){

							// Check if entry is a Link.
							if ( ! this instanceof Link ) {
								status = false;
								return false;
							}

							// Set default values.
							if( this.decimals === undefined ) {
								this.decimals = q['decimals'];
							}
							if( this.mark === undefined ) {
								this.mark = q['mark'];
							}

							// Assign other properties.
							this.N = i;
							this.obj = sliders;
							this.validate();
						});
					});

					if ( parsed.dir ) {
						parsed.ser.reverse();
					}

					parsed.decimals = q['decimals'];
					parsed.mark = q['mark'];

					return status;
				}
			}
			,'slide': {
				 t: function( q ){
					parsed.slide = q;
					return $.isFunction(q);
				}
			}
			,'set': {
				 t: function( q ){
					parsed.set = q;
					return $.isFunction(q);
				}
			}
			,'block': {
				 t: function( q ){
					parsed.block = q;
					return $.isFunction(q);
				}
			}
			,'step': {
				 t: function( q ){
					q = parseFloat(q);
					parsed.step = fromPercentage ( parsed.range, q );
					return isNumeric(q);
				}
			}
		};

		$.each( tests, function( name, test ){

			if ( options[name] === undefined ) {
				if ( !test.r ) {
					return true;
				}
			} else if ( test.t( options[name], sliders ) ) {
				return true;
			}

			// For debugging purposes it might be very useful to know
			// what option caused the trouble. Since throwing an error
			// will prevent further script execution, log the error
			// first. Test for console, as it might not be available.
			if( console && console.log && console.group ){
				console.group( 'Invalid noUiSlider initialisation:' );
				console.log( 'Option:\t', name );
				console.log( 'Value:\t', options[name] );
				console.log( 'Slider(s):\t', sliders );
				console.groupEnd();
			}

			throw new RangeError('noUiSlider');
		});

		return parsed;
	}

	// Attach events to several slider parts.
	function events ( target, base, handles, behaviour ) {

		var dragable, i;

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {
			for ( i = 0; i < handles.length; i++ ) {

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attach ( actions.start, handles[i].children(), start, {
					 base: base
					,target: target
					,handles: [ handles[i] ]
				});
			}
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {
			attach ( actions.start, base, tap, {
				 base: base
				,target: target
			});
		}

		// Extend tapping behaviour to target
		if ( behaviour.extend ) {

			target.addClass( clsList[19] );

			if ( behaviour.tap ) {
				attach ( actions.start, target, edge, {
					 base: base
					,target: target
				});
			}
		}

		// Make the range dragable.
		if ( behaviour.drag ){

			dragable = base.find('.'+clsList[9]).addClass(clsList[18]);

			// When the range is fixed, the entire range can
			// be dragged by the handles. The handle in the first
			// origin will propagate the start event upward,
			// but it needs to be bound manually on the other.
			if ( behaviour.fixed ) {
				dragable = dragable
					.add( base.children().not(dragable).data('grab') );
			}

			attach ( actions.start, dragable, start, {
				 base: base
				,target: target
				,handles: handles
			});
		}
	}

	// Append a handle to the base.
	function makeHandle ( base, target, options, i ) {

		var handle = $('<div><div/></div>').appendTo(base), grab,
			link = new Link( handle, false, options.decimals, options.mark );

		grab = handle.children().addClass([ clsList[2],
			clsList[2] + clsList[7 + options.dir + (options.dir ? -1 : 1) * i]
		].join(' '));

		$.each(options.ser[i], function(){
			if ( this.el ){
				this.target = this.target.add($(this.el).appendTo(handle));
			}
		});

		// Make sure every handle has access to all variables.
		// Every handle has a storage point, which takes care
		// of triggering the proper serialization callbacks.
		return handle.addClass( clsList[1] ).data({
			 'base': base
			,'target': target
			,'options': options
			,'grab': grab
			,'pct': -1
			,'store': {
				 element: link.validate()
				,elements: options.ser[i]
				,target: target
				,val: serialize
			}
		}).attr('data-style', options.style);
	}

	// Initialize a single slider.
	function slider ( options ) {

		var base = $('<div/>').appendTo( $(this) ), i, handles = [];

		// Throw an error if the slider was already initialized.
		if ( $(this).data('base') ) {
			throw new Error('Slider was already initialized.');
		}

		// Apply classes and data to the target.
		$(this).data('base', base).addClass([
			clsList[6]
		   ,clsList[16 + options.direction]
		   ,clsList[10 + options.ort] ].join(' '));

		// Append handles.
		for (i = 0; i < options.handles; i++ ) {
			handles.push( makeHandle( base, $(this), options, i ) );
		}

		// Apply the required connection classes to the elements
		// that need them. Some classes are made up for several
		// segments listed in the class list, to allow easy
		// renaming and provide a minor compression benefit.
		switch ( options.connect ) {
			case 1:	$(this).addClass( clsList[9] );
					handles[0].addClass( clsList[12] );
					break;
			case 3: handles[1].addClass( clsList[12] );
					/* falls through */
			case 2: handles[0].addClass( clsList[9] );
					/* falls through */
			case 0: $(this).addClass(clsList[12]);
					break;
		}

		// Merge base classes with default,
		// and store relevant data on the base element.
		base.addClass( clsList[0] ).data({
			 'target': $(this)
			,'options': options
			,'handles': handles
		});

		// Use the public value method to set the start values.
		$(this).val( options.start );

		// Attach proper events.
		events ( $(this), base, handles, options.events );
	}

	// Parse options, add classes, attach events, create HTML.
	function create ( options ) {

		// Store the original set of options on all targets,
		// so they can be re-used and re-tested later.
		// Make sure to break the relation with the options,
		// which will be changed by the 'test' function.
		this.data('options', $.extend(true, {}, options));

		// Set defaults where applicable;
		options = $.extend({
			 'handles': 2
			,'margin': 0
			,'connect': false
			,'direction': 'ltr'
			,'behaviour': 'tap'
			,'orientation': 'horizontal'
		}, options);

		// Make sure the test for serialization runs.
		options['serialization'] = $.extend({
			 'mark': '.'
			,'decimals': 2
			,'lower': []
			,'upper': []
		}, options['serialization']);

		// Run all options through a testing mechanism to ensure correct
		// input. The test function will throw errors, so there is
		// no need to capture the result of this call. It should be noted
		// that options might get modified to be handled properly. E.g.
		// wrapping integers in arrays.
		options = test( options, this );

		// Pre-define the styles.
		options.style = options.ort ? 'top' : 'left';

		return this.each(function(){
			slider.call(this, options);
		});
	}

	// Unbind all attached events, remove classed and HTML.
	function destroy ( target ) {

		// Start the list of elements to be unbound with the target.
		var elements = [];

		// Get the fields bound to both handles.
		$.each(target.data('base').data('handles'), function(){
			elements = elements.concat( $(this).data('store').elements );
		});

		// Remove all events added by noUiSlider.
		$.each(elements, function(){
			this.target.off( namespace );
		});

		// Remove all classes from the target, empty it and remove all data.
		target.off( namespace )
			.removeClass(clsList.join(' '))
			.empty()
			.removeData('base options');
	}

	// Merge options with current initialization, destroy slider, reinitialize.
	function build ( options ) {

		// When uninitialised, jQuery will return '',
		// Zepto returns undefined. Both are falsy.
		var values = $(this).val() || false,
			current = $(this).data('options'),
		// Extend the current setup with the new options.
			setup = $.extend( {}, current, options );

		// If there was a slider initialised, remove it first.
		if ( values !== false ) {
			destroy( $(this) );
		}

		// Make the destroy method publicly accessible.
		if( !options ) {
			return;
		}

		// Create a new slider
		$(this).noUiSlider( setup );

		// Set the slider values back. If the start options changed,
		// it gets precedence.
		if ( values !== false && setup.start === current.start ) {
			$(this).val( values );
		}
	}

	// Return value for the slider, relative to 'range'.
	function getValue ( ) {

		/*jshint validthis: true */

		var base = $(this).data('base'), answer = [];

		// Loop the handles, and get the value from the input
		// for every handle on its' own.
		$.each( base.data('handles'), function(){
			answer.push( $(this).data('store').val() );
		});

		// If the slider has just one handle, return a single value.
		// Otherwise, return an array, which is in reverse order
		// if the slider is used RTL.
		if ( answer.length === 1 ) {
			return answer[0];
		}

		if ( base.data('options').direction ) {
			return answer.reverse();
		}

		return answer;
	}

	// Set value for the slider, relative to 'range'.
	function setValue ( values, set ) {

		/*jshint validthis: true */

		var base = $(this).data('base'), to,
			handles = Array.prototype.slice.call( base.data('handles'), 0 ),
			options = base.data('options');

		// If there are multiple handles to be set run the setting
		// mechanism twice for the first handle, to make sure it
		// can be bounced of the second one properly.
		if ( handles.length > 1 ) {
			handles[2] = handles[0];
		}

		// The RTL settings is implemented by reversing the front-end,
		// internal mechanisms are the same.
		if ( options.dir ) {
			values.reverse();
		}

		$.each( handles, function( i, handle ) {

			// Calculate a new position for the handle.
			to = values[ i%2 ];

			// The set request might want to ignore this handle.
			// Test for 'undefined' too, as a two-handle slider
			// can still be set with an integer.
			if( to === null || to === undefined ) {
				return true;
			}

			// Handle comma as period.
			if( $.type( to ) === 'string' ) {
				to = to.replace(',', '.');
			}

			// Calculate the new handle position
			to = toPercentage( options.range, parseFloat( to ) );

			// Invert the value if this is an right-to-left slider.
			if ( options.dir ) {
				to = 100 - to;
			}

			// If the value of the input doesn't match the slider, reset it.
			if ( setHandle( handle, to ) !== true ){
				handle.data('store').val( true );
			}
		});

		// Optionally trigger the 'set' event.
		if( set === true ) {
			call( options.set, $(this) );
		}
	}


/* Exposed functions
 */

	// Value handler.
	function value ( ) {

		// If this isn't noUiSlider, continue with jQuery's original method.
		if ( !this.hasClass( clsList[6] ) ){
			return $VAL.apply( this, arguments );
		}

		// Convert the arguments object to an array.
		var args = Array.prototype.slice.call( arguments, 0 );

		// The slider may be set to an integer instead of an array. Wrap it.
		if( !$.isArray( args[0] ) ){
			args[0] = [ args[0] ];
		}

		// Handle setting for each slider in the data set.
		if ( args[0].length ) {
			return this.each(function(){
				setValue.apply(this, args);
			});
		}

		// If the function is called without arguments act as a 'getter'.
		return getValue.apply( this );
	}

	// Main entry point to all functions.
	function noUiSlider ( options, rebuild ) {

		var sliders = this;

		if ( rebuild ) {
			return this.each(function(){
				build.call(sliders, options);
			});
		}

		return create.call( this, options );
	}


/* jQuery/Zepto extensions
 */

	// Expose serialization constructor.
	$.noUiSlider = { 'Link': Link };

	// Expose noUiSlider.
	$.fn.noUiSlider = noUiSlider;

	// Overwrite the native jQuery value function.
	$.fn.val = value;

}( window.jQuery || window.Zepto ));
