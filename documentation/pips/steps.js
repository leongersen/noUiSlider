function filter500( value, type ){
	return value % 1000 ? 2 : 1;
}

$("#pips-steps").noUiSlider_pips({
	mode: 'steps',
	density: 3,
	filter: filter500,
	format: wNumb({
		decimals: 2,
		prefix: '$'
	})
});
