$("#behaviour").noUiSlider({
	start: [ 20, 40 ],
	step: 10,
	behaviour: 'drag-fixed',
	connect: true,
	range: {
		'min': [ 20 ],
		'max': [ 80 ]
	}
});
