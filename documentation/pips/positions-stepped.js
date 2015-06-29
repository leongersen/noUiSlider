var positionsStepped = document.getElementById('pips-positions-stepped');

noUiSlider.create(positionsStepped, {
	range: range_all_sliders,
	start: 0,
	pips: {
		mode: 'positions',
		values: [0,25,50,75,100],
		density: 4,
		stepped: true
	}
});
