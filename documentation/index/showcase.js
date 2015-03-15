$('#range').noUiSlider({
	start: [ 20, 80 ],
	step: 10,
	margin: 20,
	connect: true,
	direction: 'rtl',
	orientation: 'vertical',
	
	// Configure tapping, or make the selected range dragable.
	behaviour: 'tap-drag',
	
	// Full number format support.
	format: wNumb({
		mark: ',',
		decimals: 1
	}),
	
	// Support for non-linear ranges by adding intervals.
	range: {
		'min': 0,
		'max': 100
	}
});

// Reading/writing + validation from an input? One line.
$('#range').Link('lower').to($('#value-input'));

// Write to a span? One line.
$('#range').Link('upper').to($('#value-span'), 'html');

// Optional addon: creating Pips (Percentage In Point);
$('#range').noUiSlider_pips({
	mode: 'steps',
	density: 2
});
