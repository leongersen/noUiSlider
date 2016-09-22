var slider = document.getElementById('slider');

noUiSlider.create(slider, {
	start: [20, 80],
	connect: true,
	direction: 'rtl',
	tooltips: [true, wNumb({ prefix: '&' })],
	range: {
		'min': [0, 10],
		'50%': [80, 50],
		'max': 200
	}
});

var S = JSON.stringify;

slider.noUiSlider.on('slide', function( values, handle, unencoded, tap, positions ){

	var steps = slider.noUiSlider.steps();
	var get = slider.noUiSlider.get();

	console.log('Arguments', handle, values, unencoded, tap, positions);
	console.log('Value', values[handle]);
	console.log('Get', S(get));
	console.log('Get@h', get[handle]);
	console.log('Steps', S(steps));
	console.log('Step@h', S(steps[handle]));
	console.log('----------------');

});
