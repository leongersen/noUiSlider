var connectSlider = document.getElementById('slider-connect');

noUiSlider.create(connectSlider, {
	start: 40,
	connect: [true, false],
	range: {
	  'min': 0,
	  'max': 100
	}
});
