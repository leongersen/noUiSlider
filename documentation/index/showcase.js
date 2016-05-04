var range = document.getElementById('range');

noUiSlider.create(range, {
	start: [ 20, 80 ], // Handle start position
	step: 10, // Slider moves in increments of '10'
	margin: 20, // Handles must be more than '20' apart
	connect: true, // Display a colored bar between the handles
	direction: 'rtl', // Put '0' at the bottom of the slider
	orientation: 'vertical', // Orient the slider vertically
	behaviour: 'tap-drag', // Move handle on tap, bar is draggable
	range: { // Slider can select '0' to '100'
		'min': 0,
		'max': 100
	},
	pips: { // Show a scale with the slider
		mode: 'steps',
		density: 2
	}
});
