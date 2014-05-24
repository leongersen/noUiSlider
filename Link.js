/**@preserve
$.Link (part of noUiSlider) - WTFPL */

/*jslint browser: true */
/*jslint sub: true */
/*jslint white: true */

(function( $ ){

	'use strict';

	// Throw an error if formatting options are incompatible.
	function throwEqualError( F, a, b ) {
		if ( (F[a] || F[b]) && (F[a] === F[b]) ) {
			throw new Error("(Link) '"+a+"' can't match '"+b+"'.'");
		}
	}

	// Test in an object is an instance of jQuery or Zepto.
	function isInstance ( a ) {
		return a instanceof $ || ( $['zepto'] && $['zepto']['isZ'](a) );
	}


var
/** @const */ FormatNames = [
/*  0 */  'decimals'
/*  1 */ ,'mark'
/*  2 */ ,'thousand'
/*  3 */ ,'prefix'
/*  4 */ ,'postfix'
/*  5 */ ,'encoder'
/*  6 */ ,'decoder'
/*  7 */ ,'negative'
/*  8 */ ,'negativeBefore'
/*  9 */ ,'to'
/* 10 */ ,'from'
	],
/** @const */ FormatDefaults = [
/*  0 */  2
/*  1 */ ,'.'
/*  2 */ ,''
/*  3 */ ,''
/*  4 */ ,''
/*  5 */ ,function(a){ return a; }
/*  6 */ ,function(a){ return a; }
/*  7 */ ,'-'
/*  8 */ ,''
/*  9 */ ,function(a){ return a; }
/* 10 */ ,function(a){ return a; }
	],
/** @const */ Public_Methods = [
		'setValue',
		'setFormatting',
		'setChangeHandler',
		'setTarget',
		'resetValue',
		'getValue',
		'getFormattedValue'
	];

	/** @constructor */
	function Format( options ){

		// Allow 'init' from existing object.
		if ( options instanceof Format ) {
			return options;
		}

		// If no settings where provided, the defaults will be loaded.
		if ( options === undefined ){
			options = {};
		}

		if ( typeof options !== 'object' ){
			throw new Error("(Format) 'format' option must be an object.");
		}

		var settings = {};

		// Copy all values into a new object.
		$(FormatNames).each(function(i, val){

			if ( options[val] === undefined ){

				settings[val] = FormatDefaults[i];

			// When we aren't loading defaults, validate the entry.
			} else if ( (typeof options[val]) === (typeof FormatDefaults[i]) ) {

				// Support for up to 7 decimals.
				// More can't be guaranteed due to floating point issues.
				if ( val === 'decimals' ){
					if ( options[val] < 0 || options[val] > 7 ){
						throw new Error("(Format) 'format.decimals' option must be between 0 and 7.");
					}
				}

				settings[val] = options[val];

			// If the value isn't valid, emit an error.
			} else {
				throw new Error("(Format) 'format."+val+"' must be a " + typeof FormatDefaults[i] + ".");
			}
		});

		// Some values can't be extracted from a
		// string if certain combinations are present.
		throwEqualError(settings, 'mark', 'thousand');
		throwEqualError(settings, 'prefix', 'negative');
		throwEqualError(settings, 'prefix', 'negativeBefore');

		this.settings = settings;
	}

	// Shorthand for internal value get
	Format.prototype.v = function ( a ) {
		return this.settings[a];
	};

	Format.prototype.to = function ( number ) {

		function reverse ( a ) {
			return a.split('').reverse().join('');
		}

		number = this.v('encoder')( number );

		var decimals = this.v('decimals'),
			negative = '', preNegative = '', base = '', mark = '';

		// Rounding away decimals might cause a value of -0
		// when using very small ranges. Remove those cases.
		if ( parseFloat(number.toFixed(decimals)) === 0 ) {
			number = '0';
		}

		if ( number < 0 ) {
			negative = this.v('negative');
			preNegative = this.v('negativeBefore');
		}

		// Round to proper decimal count
		number = Math.abs(number).toFixed(decimals).toString();
		number = number.split('.');

		// Group numbers in sets of three.
		if ( this.v('thousand') ) {
			base = reverse(number[0]).match(/.{1,3}/g);
			base = reverse(base.join(reverse( this.v('thousand') )));
		} else {
			base = number[0];
		}

		// Ignore the decimal separator if decimals are set to 0.
		if ( this.v('mark') && number.length > 1 ) {
			mark = this.v('mark') + number[1];
		}

		// Return the finalized formatted number.
		return this.v('to')(preNegative +
			this.v('prefix') +
			negative +
			base +
			mark +
			this.v('postfix'));
	};

	Format.prototype.from = function ( input ) {

		function esc(s){
			return s.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, '\\$&');
		}

		var isNeg;
		// The set request might want to ignore this handle.
		// Test for 'undefined' too, as a two-handle slider
		// can still be set with an integer.
		if ( input === null || input === undefined ) {
			return false;
		}

		input = this.v('from')(input);

		// Remove formatting and set period for float parsing.
		input = input.toString();

		// Replace the preNegative indicator.
		isNeg = input.replace(new RegExp('^' + esc( this.v('negativeBefore') )), '');

		// Check if the value changed by removing the negativeBefore symbol.
		if( input !== isNeg ) {
			input = isNeg;
			isNeg = '-';
		} else {
			isNeg = '';
		}

		// If prefix is set and the number is actually prefixed.
		input = input.replace(new RegExp('^'+esc( this.v('prefix') )), '');

		// Only replace if a negative sign is set.
		if ( this.v('negative') ) {

			// Reset isNeg to prevent double '-' insertion.
			isNeg = '';

			// Reset the negative sign to '-'
			input = input.replace(new RegExp('^'+esc( this.v('negative') )), '-');
		}

		// Clean the input string
		input = input
		// If postfix is set and the number is postfixed.
			.replace( new RegExp(esc( this.v('postfix') ) + '$'), '')
		// Remove the separator every three digits.
			.replace( new RegExp(esc( this.v('thousand') ), 'g'), '')
		// Set the decimal separator back to period.
			.replace( this.v('mark'), '.');

		// Run the user defined decoder. Returns input by default.
		input = this.v('decoder')( parseFloat( isNeg + input ) );

		// Ignore invalid input
		if (isNaN( input )) {
			return false;
		}

		return input;
	};


/** @constructor */
	function Link ( entry, update ) {

		if ( typeof entry !== "object" ) {
			$.error("(Link) Initialize with an object.");
		}

		// Make sure Link isn't called as a function, in which case
		// the 'this' scope would be the window.
		this.init( entry['target']||function(){}, entry['method'], entry['format']||{}, update );

		this.changeHandler = function ( e ) {
			this.changeHandlerMethod(e);
		}
	}

// Target types
	Link.prototype.configureTooltip = function ( target, method ) {

		// By default, use the 'html' method.
		this.method = method || 'html';

		// Use jQuery to create the element
		this.el = $( target.replace('-tooltip-', '') || '<div/>' )[0];
	};

	Link.prototype.configureHidden = function ( target ) {

		this.method = 'val';

		this.el = document.createElement('input');
		this.el.name = target;
		this.el.type = 'hidden';
	};

	Link.prototype.configureField = function ( target ) {

		// Default to .val if this is an input element.
		this.method = 'val';
		// Set the slider to a new value on change.
		this.target = target.on('change', this.changeHandler);
	};


// Initialisor

	// Gets arguments from constructor.
	Link.prototype.init = function ( target, method, format, update ) {

		// Create a new Formatter. The constructor accepts 'undefined'.
		this.formatInstance = new Format(format);

		// Store the update option.
		this.update = !update;

		// If target is a string, a new hidden input will be created.
		if ( typeof target === 'string' && target.indexOf('-tooltip-') === 0 ) {
			this.configureTooltip( target, method );
			return;
		}

		// If the string doesn't begin with '-', which is reserved, add a new hidden input.
		if ( typeof target === 'string' && target.indexOf('-') !== 0 ) {
			this.configureHidden( target );
			return;
		}

		// The target can also be a function, which will be called.
		if ( typeof target === 'function' ) {
			this.target = false;
			this.method = target;
			return;
		}

		if ( isInstance( target ) ) {

			if ( !method ) {

			// If a jQuery/Zepto input element is provided, but no method is set,
			// the element can assume it needs to respond to 'change'...
				if ( target.is('input, select, textarea') ) {
					this.configureField( target );
					return;
				}

			// If no method is set, and we are not auto-binding an input, default to 'html'.
				method = 'html';
			}

			// The method must exist on the element.
			if ( typeof method === 'function' || (typeof method === 'string' && target[method]) ) {
				this.method = method;
				this.target = target;
				return;
			}
		}

		// Nothing matched, throw error.
		throw new RangeError("(Link) Invalid Link.");
	};


// Public setters

	// Provides external items with the slider value.
	Link.prototype['setValue'] = function ( value, update ) {

		// Don't synchronize this Link.
		if ( this.update && update === false ) {
			return;
		}

		// Ignore named arguments value and update, so only the passed-on
		// arguments remain.
		var args = Array.prototype.slice.call( arguments ),
			additionalArgs = args.slice(2);

		console.log(this);

		// Store some values. The actual, numerical value,
		// the formatted value and the parameters for use in 'resetValue'.
		// Slice additionalArgs to break the relation.
		this.actual = value;
		this.saved = this.formatInstance.to( value );
		this.args = additionalArgs.slice();

		// Prepend the value to the function arguments.
		additionalArgs.unshift( this.saved );

		// When target is undefined, the target was a function.
		// In that case, provided the slider as the calling scope.
		// Use [0] to get the DOM element, not the $ instance.

		// Branch between serialization to a function or an object.
		( typeof this.method === 'function' ?
			this.method :
			this.target[ this.method ] ).apply( this.target, additionalArgs );
	};

	// Set formatting options.
	Link.prototype['setFormatting'] = function ( options ) {
		this.formatInstance = new Format (
			$.extend( {}, options, this.formatInstance.settings )
		);
	};

	// Set the event handler to be triggered when a linked input changes.
	Link.prototype['setChangeHandler'] = function ( handler ) {
		this.changeHandlerMethod = handler;
	}

	// Set the target if it isn't set yet.
	Link.prototype['setTarget'] = function ( target ) {
		if ( !this.target ) {
			this.target = target;
		}
	};


// Public getters

	// Allow calling the 'setValue' method from cache.
	Link.prototype['resetValue'] = function ( update ) {
		var args = this.args.slice();
		args.unshift(this.actual, update);
		this.setValue.apply(this, args);
	};

	// Converts a formatted value back to a real number.
	Link.prototype['getValue'] = function ( a ) {
		return this.formatInstance.from(a);
	};

	// Return saved (formatted) value.
	Link.prototype['getFormattedValue'] = function ( a ) {
		return this.saved;
	};


// Expose a wrapper, not Link

	function closure ( a, b ) {

		var linkInstance = new Link(a,b),
			that = this;

		// Forward calls, but don't expose the actual Link.
		$.each(Public_Methods, function( index, value ){
			that[value] = function(){
				return linkInstance[value].apply(linkInstance, arguments);
			};
		});

		// See if this Link needs individual targets based on its usage.
		// If so, return the element that needs to be copied by the
		// implementing interface.
		this.needsClone = function(){
			return linkInstance.el || false;
		};

		// Create a new instance.
		this.clone = function( target ){
			return new LinkWrapper({
				'target': target,
				'method': this.method,
				'format': this.formatInstance
			}, true);
		};
	}

	function LinkWrapper ( a, b ) {
		if ( !(this instanceof LinkWrapper) ) {
			return new LinkWrapper(a,b);
		}
		closure.call( this, a, b );
	}

	/** @expose */
	$.Link = LinkWrapper;

}( window['jQuery'] || window['Zepto'] ));
