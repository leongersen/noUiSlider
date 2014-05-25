/**@preserve
$.Link (part of noUiSlider) - WTFPL */

/*jslint browser: true */
/*jslint sub: true */
/*jslint white: true */

(function( $ ){

	'use strict';

	// Test in an object is an instance of jQuery or Zepto.
	function isInstance ( a ) {
		return a instanceof $ || ( $['zepto'] && $['zepto']['isZ'](a) );
	}


var
/** @const */ Public_Methods = [
		'implement',
		'setValue',
		'resetValue',
		'fromFormat',
		'toFormat'
	];

/** @constructor */
	function Link ( entry, update ) {

		if ( typeof entry !== "object" ) {
			throw new Error("(Link) Initialize with an object.");
		}

		var that = this;

		// Forward calls within scope.
		this.changeHandler = function ( e ) {
			that.changeHandlerMethod(e);
		}

		// Make sure Link isn't called as a function, in which case
		// the 'this' scope would be the window.
		this.init( entry['target']||function(){}, entry['method'], entry['format']||{}, update );
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


// Developer calls

	Link.prototype['implement'] = function ( alternativeTarget, baseFormattingOptions, changeHandlerMethod ) {

		// Set the target if it isn't set yet.
		if ( alternativeTarget && !this.target ) {
			this.target = target;
		}

		// Set formatting options.
	//	this.formatInstance.extendUpon( new Format(baseFormattingOptions) );

		this.changeHandlerMethod = changeHandlerMethod;

		return this;
	};


// Value interaction

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

		// Store some values. The actual, numerical value,
		// the formatted value and the parameters for use in 'resetValue'.
		// Slice additionalArgs to break the relation.
		this.actual = value;
		this.args = additionalArgs.slice();

		// Prepend the value to the function arguments.
		additionalArgs.unshift( this.toFormat() );

		// When target is undefined, the target was a function.
		// In that case, provided the slider as the calling scope.
		// Use [0] to get the DOM element, not the $ instance.

		// Branch between serialization to a function or an object.
		( typeof this.method === 'function' ?
			this.method :
			this.target[ this.method ] ).apply( this.target, additionalArgs );
	};

	// Allow calling the 'setValue' method from cache.
	Link.prototype['resetValue'] = function ( update ) {
		var args = this.args.slice();
		args.unshift(this.actual, update);
		this.setValue.apply(this, args);
	};


// Format interaction

	// Converts a formatted value back to a real number.
	Link.prototype['fromFormat'] = function ( value ) {
		return this.formatInstance.from( value );
	};

	// Format a real number using the formatter.
	Link.prototype['toFormat'] = function ( value ) {
		return this.formatInstance.to( this.actual );
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
