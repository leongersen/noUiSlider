var tooltipSlider = document.getElementById('slider-tooltips');

noUiSlider.create(tooltipSlider, {
	start: [20, 80],
	tooltips: [ false, wNumb({ decimals: 1 }) ],
	range: {
		'min': 0,
		'max': 100
	}
});
