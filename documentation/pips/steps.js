function filter500( value, type ){
	return value % 1000 ? 2 : 1;
}

var pipsSteps = document.getElementById('pips-steps');

noUiSlider.create(pipsSteps, {
	range: range_all_sliders,
	start: 0,
	pips: {
		mode: 'steps',
		density: 3,
		filter: filter500,
		format: wNumb({
			decimals: 2,
			prefix: '$'
		})
	}
});
