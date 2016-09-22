var range = document.getElementById('range');

noUiSlider.create(range, {
	start: [ 1400, 2000, 2300 ], // Handle count and start position
	margin: 200, // Handles must be at least 200 apart
	limit: 600, // ... but no more than 600
	connect: true, // Display a colored bar between the handles
	direction: 'rtl', // Put '0' at the bottom of the slider
	orientation: 'vertical', // Orient the slider vertically
	behaviour: 'tap-drag', // Move handle on tap, bar is draggable
	format: wNumb({
		decimals: 0,
		thousand: '.'
	}),
	range: {
		'min': 1300,
		'max': 2700
	},
	pips: { // Show a scale with the slider
		mode: 'positions',
		values: [0,25,50,75,100],
		density: 4
	}
});
