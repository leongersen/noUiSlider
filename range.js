(function(){

// Helpers

	// Determine the size of a sub-range in relation to a full range.
	function subRangeRatio ( pa, pb ) { // 0
		return (100 / (pb - pa));
	}

	// Round a value to the closest 'to'.
	function closest ( value, to ) { // 0
		return Math.round(value / to) * to;
	}

	// Checks whether a value is numerical.
	function isNumeric ( a ) {
		return typeof a === 'number' && !isNaN( a ) && isFinite( a );
	}


// Value calculation

	// (percentage) How many percent is this value of this range?
	function fromPercentage ( range, value ) { // 1
		return (value * 100) / ( range[1] - range[0] );
	}

	// (percentage) Where is this value on this range?
	function toPercentage ( range, value ) { // 0
		return fromPercentage( range, range[0] < 0 ?
			value + Math.abs(range[0]) :
				value - range[0] );
	}

	// (value) How much is this percentage on this range?
	function isPercentage ( range, value ) { // 0
		return ((value * ( range[1] - range[0] )) / 100) + range[0];
	}


// Range conversion

	// (percentage) Input a value, find where, on a scale of 0-100, it applies.
	function toStepping ( xVal, xPct, value ) { // 3

		if ( value >= xVal.slice(-1)[0] ){
			return 100;
		}

		var j = 1, va, vb, pa, pb;
		while ( value >= xVal[j] ){
			j++;
		}

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
	}

	// (value) Input a percentage, find where it is on the specified range.
	function fromStepping ( xVal, xPct, value ) { // 3

		// There is no range group that fits 100
		if ( value >= 100 ){
			return xVal.slice(-1)[0];
		}

		var j = 1, va, vb, pa, pb;
		while ( value >= xPct[j] ){
			j++;
		}

		va = xVal[j-1];
		vb = xVal[j];
		pa = xPct[j-1];
		pb = xPct[j];

		return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
	}

	// (j) Get the applicable step position.
	function getStepPoint ( direction, xPct, value ) { // 1

		var j = 1;

		// Find the proper step for rtl sliders by search in inverse direction.
		// Fixes issue #262.
		while ( (direction ? (100 - value) : value) >= xPct[j] ){
			j++;
		}

		return j;
	}

	// (percentage) Get the step that applies at a certain value.
	function getStep ( xPct, xSteps, snap, direction, value ) { // 3

		var j = getStepPoint( direction, xPct, value ), a, b;

		// If 'snap' is set, steps are used as fixed points on the slider.
		if ( snap ) {

			a = xPct[j-1];
			b = xPct[j];

			// Find the closest position, a or b.
			if ((value - a) > ((b-a)/2)){
				return b;
			}

			return a;
		}

		if ( !xSteps[j-1] ){
			return value;
		}

		return xPct[j-1] + closest(
			value - xPct[j-1],
			xSteps[j-1]
		);
	}


// Entry parsing

	function handleEntryPoint ( index, value, that ) {

		var percentage;

		// Wrap numerical input in an array.
		if ( typeof value === "number" ) {
			value = [value];
		}

		// Reject any invalid input, by testing whether value is an array.
		if ( Object.prototype.toString.call( value ) !== '[object Array]' ){
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
		that.xPct.push( percentage );
		that.xVal.push( value[0] );

		// NaN will evaluate to false too, but to keep
		// logging clear, set step explicitly. Make sure
		// not to override the 'step' setting with false.
		if ( !percentage ) {
			if ( !isNaN( value[1] ) ) {
				that.xSteps[0] = value[1];
			}
		} else {
			that.xSteps.push( isNaN(value[1]) ? false : value[1] );
		}
	}

	function handleStepPoint ( i, n, that ) {

		// Ignore 'false' stepping.
		if ( !n ) {
			return true;
		}

		// Factor to range ratio
		that.xSteps[i] = fromPercentage([
			 that.xVal[i]
			,that.xVal[i+1]
		], n) / subRangeRatio (
			that.xPct[i],
			that.xPct[i+1] );
	}


// Interface

	function Spectrum ( entry, snap, direction, singleStep ) {

		this.xPct = [];
		this.xVal = [];
		this.xSteps = [ singleStep || false ];
		this.xNumSteps = [ false ];

		this.snap = snap;
		this.direction = direction;

		var that = this, index;

		// Loop all entries.
		for ( index in entry ) {
			if ( entry.hasOwnProperty(index) ) {
				handleEntryPoint(index, entry[index], that);
			}
		}

		// Store the actual step values.
		that.xNumSteps = that.xSteps.slice(0);

		for ( index in that.xNumSteps ) {
			if ( that.xNumSteps.hasOwnProperty(index) ) {
				handleStepPoint(Number(index), that.xNumSteps[index], that);
			}
		}
	}

	Spectrum.prototype.toStepping = function ( value ) {
		return toStepping(this.xVal, this.xPct, value );
	};

	Spectrum.prototype.fromStepping = function ( value ) {
		return fromStepping(this.xVal, this.xPct, value );
	};

	Spectrum.prototype.getStep = function ( value ) {
		return getStep(this.xPct, this.xSteps, this.snap, this.direction, value );
	};

	Spectrum.prototype.getApplicableStep = function ( value ) {
		return this.xNumSteps[getStepPoint(this.direction, this.xPct, value) - 1];
	};

	window.Spectrum = Spectrum;
	
}());
