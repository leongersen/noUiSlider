var slider = document.getElementById('keypress'),
	input = document.getElementById('input-with-keypress');

noUiSlider.create(slider, {
	start: 40,
	step: 10,
	range: {
		'min': 0,
		'20%': [ 300, 100 ],
		'50%': [ 800, 50 ],
		'max': 1000
	}
});

slider.noUiSlider.on('update', function( values, handle ) {
	input.value = values[handle];
});

input.addEventListener('change', function(){
	slider.noUiSlider.set([null, this.value]);
});
