$("#slider-link").noUiSlider({
	start: [ 20 ],
	step: 10,
	range: {
		'min': [ 20 ],
		'max': [ 80 ]
	}
});

$("#slider-link").Link('lower', $('#span'));
$("#slider-link").Link('lower', $('#input'));
