$('#soft').noUiSlider({
	start: 50,
	range: {
		min: 0,
		max: 100
	}
});

$('#soft').noUiSlider_pips({
	mode: 'values',
	values: [20, 80],
	density: 4
});
