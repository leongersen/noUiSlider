var connectSlider = document.getElementById('connect');

noUiSlider.create(connectSlider, {
	start: [20, 80],
	connect: false,
	range: {
		'min': 0,
		'max': 100
	}
});
