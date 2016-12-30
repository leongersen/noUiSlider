var slider = document.getElementById('slider-events');
var setter = document.getElementById('setter');
var inputLog = document.getElementById('input-log');

noUiSlider.create(slider, {
	start: [ 0, 10 ],
	range: {
		'min': [ 0 ],
		'max': [ 20 ]
	}
});
