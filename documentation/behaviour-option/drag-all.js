var dragSlider = document.getElementById('drag-all');

noUiSlider.create(dragSlider, {
	start: [ 20, 40, 60 ],
	behaviour: 'drag',
	dragAllHandles: true,
	connect: true,
	range: {
		'min':  0,
		'max':  100
	}
});
