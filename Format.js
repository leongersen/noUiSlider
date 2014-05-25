/**@preserve
Numerical formatting engine - Link Protocol */

//(function(){

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
	];

	function esc(s){
		return s.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, '\\$&');
	}

	function reverse ( a ) {
		return a.split('').reverse().join('');
	}

	// Throw an error if formatting options are incompatible.
	function throwEqualError( F, a, b ) {
		if ( (F[a] || F[b]) && (F[a] === F[b]) ) {
			throw new Error("(Link) '"+a+"' can't match '"+b+"'.'");
		}
	}

	function validate ( options ) {

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

		return settings;
	}

	function toFormatting ( options, number ) {

		number = options['encoder']( number );

		var decimals = options['decimals'],
			negative = '', preNegative = '', base = '', mark = '';

		// Rounding away decimals might cause a value of -0
		// when using very small ranges. Remove those cases.
		if ( parseFloat(number.toFixed(decimals)) === 0 ) {
			number = '0';
		}

		if ( number < 0 ) {
			negative = options['negative'];
			preNegative = options['negativeBefore'];
		}

		// Round to proper decimal count
		number = Math.abs(number).toFixed(decimals).toString();
		number = number.split('.');

		// Group numbers in sets of three.
		if ( options['thousand'] ) {
			base = reverse(number[0]).match(/.{1,3}/g);
			base = reverse(base.join(reverse( options['thousand'] )));
		} else {
			base = number[0];
		}

		// Ignore the decimal separator if decimals are set to 0.
		if ( options['mark'] && number.length > 1 ) {
			mark = options['mark'] + number[1];
		}

		// Return the finalized formatted number.
		return options['to'](preNegative +
			options['prefix'] +
			negative +
			base +
			mark +
			options['postfix']);
	}

	function fromFormatting ( options, input ) {

		var isNeg;
		// The set request might want to ignore this handle.
		// Test for 'undefined' too, as a two-handle slider
		// can still be set with an integer.
		if ( input === null || input === undefined ) {
			return false;
		}

		input = options['from'](input);

		// Remove formatting and set period for float parsing.
		input = input.toString();

		// Replace the preNegative indicator.
		isNeg = input.replace( new RegExp( '^' + esc(options['negativeBefore']) ), '');

		// Check if the value changed by removing the negativeBefore symbol.
		if( input !== isNeg ) {
			input = isNeg;
			isNeg = '-';
		} else {
			isNeg = '';
		}

		// If prefix is set and the number is actually prefixed.
		input = input.replace(new RegExp( '^' + esc(options['prefix']) ), '');

		// Only replace if a negative sign is set.
		if ( options['negative'] ) {

			// Reset isNeg to prevent double '-' insertion.
			isNeg = '';

			// Reset the negative sign to '-'
			input = input.replace(new RegExp( '^' + esc(options['negative']) ), '-');
		}

		// Clean the input string
		input = input
		// If postfix is set and the number is postfixed.
			.replace( new RegExp(esc( options['postfix'] ) + '$'), '')
		// Remove the separator every three digits.
			.replace( new RegExp(esc( options['thousand'] ), 'g'), '')
		// Set the decimal separator back to period.
			.replace( options['mark'], '.');

		// Run the user defined decoder. Returns input by default.
		input = options['decoder']( parseFloat( isNeg + input ) );

		// Ignore invalid input
		if (isNaN( input )) {
			return false;
		}

		return input;
	}


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

		this.settings = validate( options );
	}

	Format.prototype.extendUpon = function ( formatInstance ) {
//		console.log( formatInstance.settings );
//		this.settings = $.extend( {}, formatInstance.settings, this.settings );
//		console.log( this.settings );
	};

	Format.prototype.to = function(a){
		return toFormatting(this.settings, a);
	};

	Format.prototype.from = function(a){
		return fromFormatting(this.settings, a);
	};

//}());
