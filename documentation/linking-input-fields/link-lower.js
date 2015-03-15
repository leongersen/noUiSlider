// Place the value in the #value element,
// using the text method.
$("#rangeSlider").Link('lower').to($("#value"), "text");

// Any selector is acceptable, so we'll
// select both inputs.
$("#rangeSlider").Link('lower').to($(".inputs"), null, wNumb({
	// Prefix the value with an Euro symbol
	prefix: '\u20AC',
	// Write the value without decimals
	decimals: 0,
	postfix: ',-'
}));
