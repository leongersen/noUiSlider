var pipsValuesStepped = document.getElementById('pips-values-stepped');

noUiSlider.create(pipsValuesStepped, {
	range: range_all_sliders,
	start: 0,
	pips: {
		mode: 'values',
		values: [50, 552, 4651, 4952, 5000, 7080, 9000],
		density: 4,
		stepped: true
	}
});
