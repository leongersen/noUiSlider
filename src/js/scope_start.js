
function closure ( target, options, originalOptions ){
	var
		actions = getActions( ),
		// All variables local to 'closure' are prefixed with 'scope_'
		scope_Target = target,
		scope_Locations = [],
		scope_Base,
		scope_Handles,
		scope_HandleNumbers = [],
		scope_Connects,
		scope_Spectrum = options.spectrum,
		scope_PreviousCalcPoint,
		scope_Values = [],
		scope_Events = {},
		scope_Self;

	var APPLY_MARGIN = true;
	var APPLY_LIMIT = true;
	var LOOK_FORWARD = true;
