var defaultSlider = document.getElementById('default-slider'),
	elementSlider = document.getElementById('object-slider'),
	stringSlider = document.getElementById('string-slider');

noUiSlider.create(defaultSlider, {
	start: [20, 80],
	range: {
		'min': [ 0 ],
		'max': [ 100 ]
	},
	documentElement: null
});

noUiSlider.create(elementSlider, {
	start: [20, 80],
	range: {
		'min': [ 0 ],
		'max': [ 100 ]
	},
	documentElement: document.getElementById('section-documentElement')
});

noUiSlider.create(stringSlider, {
	start: [20, 80],
	range: {
		'min': [ 0 ],
		'max': [ 100 ]
	},
	documentElement: 'target'
});
