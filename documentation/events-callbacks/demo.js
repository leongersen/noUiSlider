var slider = document.getElementById('slider-events'),
	setter = document.getElementById('setter'),
	inputLog = document.getElementById('input-log');

noUiSlider.create(slider, {
	start: [ 0, 10 ],
	range: {
		'min': [ 0 ],
		'max': [ 20 ]
	}
});
