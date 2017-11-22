var dragSlider = document.getElementById('drag-all');

noUiSlider.create(dragSlider, {
	start: [ 40, 60, 80 ],
	behaviour: 'drag',
	dragAllHandles: true,
	connect: true,
	range: {
		'min':  20,
		'max':  80
	}
});
