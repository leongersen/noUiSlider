(function( $ ){

	'use strict';

//		
	
	
	var
	// Cache the document selector;
	 doc = $(document)
	// Namespace for binding and unbinding slider events;
	,namespace = '.nui'
	// Copy of the current value function;
	,$val = $.fn.val
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

	// Test in an object is an instance of jQuery or Zepto.
	function isInstance ( a ) {
		return a instanceof $ || ( $.zepto && $.zepto.isZ(a) );
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return !isNaN( parseFloat( a ) ) && isFinite( a );
	}

	// Limits a value to 0 - 100
	function limit(a){
		return Math.max(Math.min(a, 100), 0);
	}

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
	function closestHandle ( handles, location, style ) {

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

	// Wraps a variable as an array, if it isn't one yet.
	function asArray ( a ){
		return $.isArray(a) ? a : [a];
	}

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

	// (percentage)
	function toStepping ( options, value ) {

		if ( !options.stepping ) {
			return toPercentage( options.range, value );
		}

		var j = 0;

		if ( value === options.range[1] ){
			return 100;
		}

		while ( value >= options.steps[++j] ){}

		var va = options.steps[j-1],
			vb = options.steps[j],
			pa = options.stepping[j-1],
			pb = options.stepping[j];

		return pa + ( toPercentage([va,vb], value)/(100/(pb-pa)) );
	}

	// (value)
	function fromStepping ( options, value ) {

		if ( !options.stepping ) {
			return isPercentage( options.range, value );
		}

		var j = 0;

		// There is no range group that fits 100
		if ( value === 100 ){
			return options.range[1];
		}

		while ( value >= options.stepping[++j] ){}

		var va = options.steps[j-1],
			vb = options.steps[j],
			pa = options.stepping[j-1],
			pb = options.stepping[j];

		return isPercentage([va, vb], (value - pa)*(100/(pb-pa)));
	}

	/**
	 * @constructor
	 */
	function Link( target, method, options ){

		// Make sure Link isn't called as a function, in which case
		// the 'this' scope would be the window.
		if ( !(this instanceof Link) ) {
			throw new Error('Can\'t use Link as a function. Use \'new Link\'.');
		}

		// Returns null array.
		function at(a,b,c){
			return [c?a:b, c?b:a];
		}

		// Options are optional. Hehe.
		options = options || {};

		// Write all options to this object.
		// Don't use key => value mapping to allow the Closure compiler
		// to rename internal properties.
		this.decimals = options['decimals'];
		this.mark = options['mark'];
		this.thousand = options['thousand'];
		this.prefix = options['prefix'];
		this.postfix = options['postfix'];
		this.encoder = options['encoder'];
		this.decoder = options['decoder'];

		switch ( typeof target ) {

		// If target is a string, a new hidden input will be created.
		case 'string':

			this.target = $([]);
			this.method = 'val';

			this.el = document.createElement('input');
			this.el.name = target;
			this.el.type = 'hidden';

			return;

		case 'function':

			// Set an empty $ object so the destroy function won't have
			// to handle .isFunction objects differently.
			this.target = $([]);
			this.method = target;
			this.isFunction = true;

			return;

		case isInstance(target) && 'object':

			this.target = target;
			this.method = method || 'val';

			if ( method ) {

				if ( typeof method === 'function' ) {
					this.scope = target;
					this.isFunction = true;
				}

				return;
			}

			this.target.on('change' + namespace,
				$.proxy(function( e ){
					this.obj.val(at(
						null, $(e.target).val(), this.N
					), false, this);
				}, this));

			return;
		}

		throw new RangeError('Invalid Link');
	}

	Link.prototype.write = function ( value, slider ) {

		// Format values for display
		value = this.format( value );

		// Branch between serialization to a function or an object.
		if ( this.isFunction ) {
			this.method.call( this.scope, value, slider );
		} else {
			this.target[ this.method ]( value );
		}
	};

	// Formats a number.
	Link.prototype.format = function ( value ) {

		// Forward the function call
		return this.present( this.encoder(value),
			this.decimals,
			this.mark,
			this.thousand,
			this.prefix,
			this.postfix );
	};

	// Checks if all settings on this object are valid,
	// or overwrites with defaults.
	Link.prototype.validate = function ( ) {

		function str(a,b){
			return typeof a === 'string' ? a : b;
		}
		function func(a){
			return ( typeof a === 'function' ) ? a : function( b ){
				return b;
			};
		}

		this.decimals = parseInt(this.decimals, 10);

		// Support for up to 7 decimals. More can't be guaranteed.
		if (!(this.decimals >= 0 && this.decimals <= 7)) {
			this.decimals = 2;
		}

		this.mark = str(this.mark, '.');
		this.thousand = str(this.thousand, ' ');
		this.prefix = str(this.prefix, '');
		this.postfix = str(this.postfix, '');

		this.encoder = func(this.encoder);
		this.decoder = func(this.decoder);

		return this;
	};

	// todo
	Link.prototype.data = function ( ) {
		return $.fn.data.apply(this.target, arguments);
	};

	// 
	Link.prototype.present = function ( number, decimals, mark, k, pre, post ) {

		function reverse ( a ) {
			return a.split('').reverse().join('');
		}

		// Round to proper decimal count
		number = number.toFixed(decimals).toString();
		number = number.split('.');

		// Rounding away decimals might cause a value of -0
		// when using very small ranges. Remove those cases.
		if ( parseFloat(number) === 0 ) {
			number[0] = '0';
		}

		// Group numbers in sets of three.
		var base = reverse(number[0]).match(/.{1,3}/g);
			base = reverse(base.join(reverse(k)));

		// Ignore the decimal separator if decimals are set to 0.
		if ( number.length > 1 ) {
			mark = mark + number[1];
		} else {
			mark = '';
		}

		// Return the finalized number.
		return pre + base + mark + post;
	};

	// Converts a formatted value back to a real number.
	Link.prototype.value = function ( format ) {

		// The set request might want to ignore this handle.
		// Test for 'undefined' too, as a two-handle slider
		// can still be set with an integer.
		if( format === null || format === undefined ) {
			return true;
		}

		// Remove formatting and set period for float parsing.
		format = parseFloat(format.toString()
			.replace(this.prefix, '')
			.replace(this.postfix, '')
			.replace(new RegExp(this.thousand, 'g'), '')
			.replace(this.mark, '.'));

		// Run the user defined decoder. Returns input by default.
		format = this.decoder( format );

		// Ignore invalid input
		if (isNaN( format )) {
			return false;
		}

		return format;
	};

	// Store a value on all serialization targets, or get the current value.
	function serialize ( a ) {

		/*jshint validthis: true */

		// Re-scope target for availability within .each;
		var target = this.target;

/*		// Get the value for this handle
		if ( a === undefined ) {
			return this.element.format( this.element.data('value') );
		}

		// Write the value to all serialization objects
		// or store a new value on the handle
		if ( a === true ) {

			a = Number(this.element.data('value'));

			// Prevent a serialization call if the value wasn't initialized.
			if ( isNaN(a) ) {
				return;
			}

		} else {
*/
			a = fromStepping( this.options, a );
			this.element.data('value', a);
/*			
		}
*/
		
		// If the provided element was a function,
		// call it with the slider as scope. Otherwise,
		// simply call the function on the object.
		$.each( this.elements, function() {
			this.write( a, target );
		});
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
			,'step': {
				 t: function( q ){
					q = parseFloat(q);
					parsed.step = fromPercentage ( parsed.range, q );
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
			,'stepping': {
				 t: function( q ){

					if ( parsed.step ) {
						return false;
					}

					parsed.stepping = [0];
					parsed.steps = [ parsed.range[0] ];

					$.each(q, function(a,b){
						parsed.stepping.push( parseFloat(a) );
						parsed.steps.push( parseFloat(b) );
					});

					parsed.steps.push( parsed.range[1] );
					parsed.stepping.push( 100 );

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
							if ( !(this instanceof Link) ) {
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
							this.scope = this.scope || sliders;
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
		};

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
		// input. It should be noted that options might get modified to
		// be handled properly. E.g. wrapping integers in arrays.
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

		// Pre-define the styles.
		parsed.style = parsed.ort ? 'top' : 'left';

		return parsed;
	}

	// Change inline style and apply proper classes.
	function placeHandle ( handle, to ) {

		to = digits(to, 7);

		// Set handle to new location
		handle.css( handle.attr('data-style'), to + '%' );

		// Force proper handle stacking
		if ( handle.is(':first-child') ) {
			handle.toggleClass(clsList[13], to > 50 );
		}

		return handle;
	}

	// Append a handle to the base.
	function addHandle ( options, index ) {

		var handle = $('<div><div/></div>'),
			link = new Link( handle, false, {
				 'decimals': options.decimals
				,'mark': options.mark
			});

		handle.children().addClass([ clsList[2],
			clsList[2] + clsList[7 + options.dir + (options.dir ? -1 : 1) * index]
		].join(' '));

		$.each( options.ser[index], function(){

			/*jshint validthis: true */

			if ( this.el ){
				this.target = this.target.add($(this.el).appendTo(handle));
			}
		});

		// Make sure every handle has access to all variables.
		// Every handle has a storage point, which takes care
		// of triggering the proper serialization callbacks.
		return [
			handle.addClass( clsList[1] ).attr('data-style', options.style), {
				 element: link.validate()
				,elements: options.ser[ index ]
				,options: options
				,val: serialize
			}
		];
	}

	// Initialize a single slider.
	function addSlider ( options ) {

		/*jshint validthis: true */

		var base = $('<div/>').appendTo( $(this) ), i, serialization = [],
			handles = [], grabs = [], handle;

	// todo
	//	// Throw an error if the slider was already initialized.
	//	if ( $(this).attr('data-nouislider') ) {
	//		throw new Error('Slider was already initialized.');
	//	}

		// Apply classes and data to the target.
		$(this).addClass([
			clsList[6]
		   ,clsList[16 + options.direction]
		   ,clsList[10 + options.ort] ].join(' '));

		// Append handles.
		for (i = 0; i < options.handles; i++ ) {

			handle = addHandle( options, i );

			handles.push( handle[0].appendTo(base) );

			handle[1].target = $(this);

			serialization.push( handle[1] );

			grabs.push( handles[i].children( '.' + clsList[2] ) );
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
		base.addClass( clsList[0] );

		return {
			 base: base
			,handles: handles
			,grabs: grabs
			,serialization: serialization
		};
	}

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

function closure ( target, options ){

	var Memory = {
		 target: $(target)
		,options: options
		,locations: [-1, -1]
		,baseSize: function(){
			return this.base[['width', 'height'][options.ort]]();
		}
	};

	// Test suggested values and apply margin, step.
	function setHandle ( handle, to, delimit ) {

		var n = handle[0] !== Memory.handles[0][0] ? 1 : 0,
			lower = Memory.locations[0] + options.margin,
			upper = Memory.locations[1] - options.margin;

		// Don't delimit range dragging.
		if ( delimit ) {
			to = n ? Math.max( to, lower ) : Math.min( to, upper );
		}

		// Limit to 0/100 for .val input, trim anything beyond 7 digits.
		to = limit(digits(to, 7));

		// Return falsy if handle can't move. False for 0 or 100 limit, 
		// '0' for limiting by another handle.
		if ( to === Memory.locations[n] ) {
			return ( to === lower || to === upper ) ? 0 : false;
		}

		// Set the handle to the new position.
		placeHandle ( handle, to );

		// Update memory locations.
		Memory.locations[n] = to;
		
		// Remove blocked state, as the handle could move.
		Memory.target.removeClass(clsList[14]);
		
		// Write values to serialization Links.
		Memory.serialization[n].val( options.dir ? 100 - to : to );

		return true;
	}

	// Fire callback on unsuccessful handle movement.
	function block ( effect ) {

		if ( Memory.target.hasClass( clsList[14] ) ){
			return;
		}

		// The visual effects should only be applied when
		// the margin option is set, and when the margin
		// is the cause for the blocking.
		if ( effect ) {
			Memory.target.addClass(clsList[15]);
			setTimeout(function(){
				Memory.target.removeClass(clsList[15]);
			}, 450);
		}

		call( options.block, Memory.target.addClass(clsList[14]) );
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
		}

		// Limit values to 0 and 100.
		return [limit(c), limit(d)];
	}

	// Handler for attaching events trough a proxy
	function attach ( events, element, callback, data ) {

		// Add the noUiSlider namespace to all events.
		events = events.replace( /\s/g, namespace + ' ' ) + namespace;

		// Bind a closure on the target.
		return element.on( events, function( e ){

			// jQuery and Zepto handle unset attributes differently.
			var disabled = Memory.target.attr('disabled');
				disabled = !( disabled === undefined || disabled === null );

			// Test if there is anything that should prevent an event
			// from being handled, such as a disabled state or an active
			// 'tap' transition.
			if( Memory.target.hasClass( clsList[5] ) || disabled ) {
				return false;
			}

			e = fixEvent(e);
			e.calcPoint = e.points[ options.ort ];

			// Call the event handler with three arguments:
			// - The event;
			// - An object with data for the event;
			// - The slider options;
			// Having the slider options as a function parameter prevents
			// getting it in every function, which muddies things up.
			callback ( e, data );
		});
	}

	// Handles movement by tapping
	function jump ( handle, to ) {

		// Flag the slider as it is now in a transitional state.
		// Transition takes 300 ms, so re-enable the slider afterwards.
		Memory.base.addClass(clsList[5]);
		setTimeout(function(){
			Memory.base.removeClass(clsList[5]);
		}, 300);

		// Move the handle to the new position.
		setHandle( handle, to );

		// Trigger the 'slide' and 'set' callbacks,
		// pass the target as scope.
		call( [options.slide, options.set], Memory.target.change() );
	}

	// Handle movement on document for handle and range drag.
	function move ( event, data ) {

		var handles = data.handles || Memory.handles,
			proposal = ((event.calcPoint - data.start) * 100) / Memory.baseSize(),
			delimit = handles.length > 1,
			positions = getPositions( proposal, data.positions, delimit ),
			h = handles[0][0] !== Memory.handles[0][0] ? 1 : 0,
			state = setHandle ( handles[0], positions[h], !delimit );

		if ( handles.length > 1 ) {
			state = setHandle ( handles[1], positions[h?0:1], !delimit ) || state;
		}

		if ( !state ) {
			block( options.margin && state === 0 );
			return;
		}

		// Trigger the 'slide' event, if the handle was moved.
		call( options.slide, Memory.target );
	}

	// Unbind move events on document, call callbacks.
	function end ( event ) {

		// The handle is no longer active, so remove the class.
		if ( Memory.handles.length === 1 ) {
			Memory.grabs[0].removeClass(clsList[4]);
		}

		// Remove cursor styles and text-selection events bound to the body.
		if ( event.cursor ) {
			$('body').css('cursor', '').off( namespace );
		}

		// Unbind the move and end events, which are added on 'start'.
		doc.off( namespace );

		// Trigger the change event.
		Memory.target.removeClass( clsList[14] +' '+ clsList[20]).change();

		// Trigger the 'end' callback.
		call( options.set, Memory.target );
	}

	// Bind move events on document.
	function start ( event, data ) {

		// Mark the handle as 'active' so it can be styled.
		if( Memory.handles.length === 1 ) {
			Memory.grabs[0].addClass(clsList[4]);
		}

		// A drag should never propagate up to the 'tap' event.
		event.stopPropagation();

		// Attach the move event.
		attach ( actions.move, doc, move, {
			 start: event.calcPoint
			,handles: data.handles
			,positions: [
				Memory.locations[0],
				Memory.locations[Memory.handles.length - 1]
			]
		});

		// Unbind all movement when the drag ends.
		attach ( actions.end, doc, end );

		// Text selection isn't an issue on touch devices,
		// so adding cursor styles can be skipped.
		if ( event.cursor ) {

			// Prevent the 'I' cursor and extend the range-drag cursor.
			$('body').css('cursor', $(event.target).css('cursor'));

			// Mark the target with a dragging state.
			if ( Memory.handles.length > 1 ) {
				Memory.target.addClass(clsList[20]);
			}

			// Prevent text selection when dragging the handles.
			$('body').on('selectstart' + namespace, false);
		}
	}

	// Move closest handle to tapped location.
	function tap ( event ) {

		var handle, to = event.calcPoint;

		// The tap event shouldn't propagate up to trigger 'edge'.
		event.stopPropagation();

		// Find the closest handle and calculate the tapped point.
		handle = closestHandle( Memory.handles, to, options.style );

		to -= Memory.base.offset()[ options.style ];
		to *= 100;

		// The set handle to the new position.
		jump( handle, to / Memory.baseSize() );
	}

	// Move handle to edges when target gets tapped.
	function edge ( event ) {

		var i = event.calcPoint < Memory.base.offset()[ options.style ],
			to = i ? 0 : 100;

		i = i ? 0 : Dt.handles.length - 1;

		jump( Memory.handles[i], to );
	}

	// Attach events to several slider parts.
	function events ( behaviour ) {

		// Attach the standard drag event to the handles.
		if ( !behaviour.fixed ) {

			var i;

			for ( i = 0; i < Memory.handles.length; i++ ) {

				// These events are only bound to the visual handle
				// element, not the 'real' origin element.
				attach ( actions.start, Memory.handles[i].children(), start, {
					handles: [ Memory.handles[i] ]
				});
			}
		}

		// Attach the tap event to the slider base.
		if ( behaviour.tap ) {
			attach ( actions.start, Memory.base, tap, Memory );
		}

		// Extend tapping behaviour to target
		if ( behaviour.extend ) {

			Memory.target.addClass( clsList[19] );

			if ( behaviour.tap ) {
				attach ( actions.start, Memory.target, edge, Memory );
			}
		}

		// Make the range dragable.
		if ( behaviour.drag ){

			var dragable = Memory.base.find('.'+clsList[9]).addClass(clsList[18]);

			// When the range is fixed, the entire range can
			// be dragged by the handles. The handle in the first
			// origin will propagate the start event upward,
			// but it needs to be bound manually on the other.
			if ( behaviour.fixed ) {
				dragable = dragable.add( Memory.base.children().not(dragable).data('grab') ); // todo
			}

			attach ( actions.start, dragable, start, Memory );
		}
	}

	// Initialise HTML and set classes.
	$.extend(Memory, addSlider.call(target, options));

	// Attach user events.
	events( options.events );

	target.set = function ( values, callback, link ){

		var i, to;

		// The RTL settings is implemented by reversing the front-end,
		// internal mechanisms are the same.
		if ( options.dir ) {
			values.reverse();
		}

		// If there are multiple handles to be set run the setting
		// mechanism twice for the first handle, to make sure it
		// can be bounced of the second one properly.
		for ( i = 0; i < ( Memory.handles.length > 1 ? 3 : 1 ); i++ ) {

			to = link || Memory.serialization[i%2].element;
			to = to.value( values[i%2] );

			// Calculate the new handle position
			to = toStepping( options, to );

			// Invert the value if this is a right-to-left slider.
			if ( options.dir ) {
				to = 100 - to;
			}

			if ( to === false || setHandle( Memory.handles[i%2], to ) !== true ){

				// Reset the input if it doesn't match the slider.
				Memory.serialization[i%2].val( Memory.locations[i%2] );
			}
		}

		// Optionally trigger the 'set' event.
		if( callback === true ) {
			call( options.set, $(this) );
		}

		return this;
	};

	target.get = function ( ){



		return 'get';
	};

	// Use the public value method to set the start values.
	$(target).val( options.start );
}

	// Expose serialization constructor.
	$.noUiSlider = { 'Link': Link };

	$.fn.noUiSlider = function ( options ){

		// Test the options once, not for every slider.
		options = test( options, this );

		// Loop all items, and provide a new closed-scope environment.
		this.each(function(){
			closure(this, options);
		});
	};

	$.fn.val = function ( ){

		// Convert the function arguments to an array.
		var args = Array.prototype.slice.call( arguments, 0 );

		// Test if there are arguments, and if not, call the 'get' method.
		if ( !arguments.length ) {

			// Determine whether to use the native val method.
			if ( this.hasClass( clsList[6] ) ) {
				return this[0][0].get();
			}

			$val.apply( this, arguments);
		}

		// Loop all individual items, and handle setting appropriately.
		return this.each(function(){

			if ( $(this).hasClass( clsList[6] ) ) {
				this.set.call( $(this), asArray(args[0]), args[1], args[2] );
			} else {
				$val.apply( $(this), args);
			}
		});
	};

}( window.jQuery ));
