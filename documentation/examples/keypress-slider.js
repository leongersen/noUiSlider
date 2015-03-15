var slider = $('#keypress'),
	input = $('#input-with-keypress');

slider.noUiSlider({
	start: 40,
	step: 10,
	range: {
		'min': 0,
		'20%': [ 300, 100 ],
		'50%': [ 800, 50 ],
		'max': 1000
	}
});

slider.Link('lower').to(input);
