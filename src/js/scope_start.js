
function closure ( target, options ){
	// clone the options because we are extending them
	// so we should not modify the user provided object
	options = clone(options);

	// All variables local to 'closure' are prefixed with 'scope_'
	var scope_Target = target,
		scope_Locations = [-1, -1],
		scope_Base,
		scope_Handles,
		scope_Spectrum = options.spectrum,
		scope_Values = [],
		scope_Events = {},
		cssClasses = [
			/*  0 */  'target'
			/*  1 */ ,'base'
			/*  2 */ ,'origin'
			/*  3 */ ,'handle'
			/*  4 */ ,'horizontal'
			/*  5 */ ,'vertical'
			/*  6 */ ,'background'
			/*  7 */ ,'connect'
			/*  8 */ ,'ltr'
			/*  9 */ ,'rtl'
			/* 10 */ ,'dragable'
			/* 11 */ ,''
			/* 12 */ ,'state-drag'
			/* 13 */ ,''
			/* 14 */ ,'state-tap'
			/* 15 */ ,'active'
			/* 16 */ ,''
			/* 17 */ ,'stacking'
			/* 18 */ ,'tooltip'
		].map(addCssPrefix(options.cssPrefix || defaultCssPrefix))
