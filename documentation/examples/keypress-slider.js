var keypressSlider = document.getElementById('keypress');
var input0 = document.getElementById('input-with-keypress-0');
var input1 = document.getElementById('input-with-keypress-1');
var inputs = [input0, input1];

noUiSlider.create(keypressSlider, {
	start: [20, 80],
	connect: true,
	direction: 'rtl',
	tooltips: [true, wNumb({ decimals: 1 })],
	range: {
		'min': [0],
		'10%': [10, 10],
		'50%': [80, 50],
		'80%': 150,
		'max': 200
	}
});

keypressSlider.noUiSlider.on('update', function( values, handle ) {
	inputs[handle].value = values[handle];
});
