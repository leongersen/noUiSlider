var pipsValues = document.getElementById('pips-values');

noUiSlider.create(pipsValues, {
	range: range_all_sliders,
	start: 0,
	pips: {
		mode: 'values',
		values: [50, 552, 2251, 3200, 5000, 7080, 9000],
		density: 4
	}
});
