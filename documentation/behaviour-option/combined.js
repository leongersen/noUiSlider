var dragTapSlider = document.getElementById('combined');

noUiSlider.create(dragTapSlider, {
	start: [ 40, 60 ],
	behaviour: 'drag-tap',
	connect: true,
	range: {
		'min':  20,
		'max':  80
	}
});
