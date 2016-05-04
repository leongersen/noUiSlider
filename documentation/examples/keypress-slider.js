var keypressSlider = document.getElementById('keypress'),
	input = document.getElementById('input-with-keypress');

noUiSlider.create(keypressSlider, {
	start: 40,
	step: 10,
	range: {
		'min': 0,
		'20%': [ 300, 100 ],
		'50%': [ 800, 50 ],
		'max': 1000
	}
});

keypressSlider.noUiSlider.on('update', function( values, handle ) {
	input.value = values[handle];
});

input.addEventListener('change', function(){
	keypressSlider.noUiSlider.set([null, this.value]);
});
