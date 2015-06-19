var tooltipSlider = document.getElementById('slider-tooltip');

noUiSlider.create(tooltipSlider, {
	start: [40, 50],
	range: {
		'min': 30,
		'30%': 40,
		'max': 50
	}
});
