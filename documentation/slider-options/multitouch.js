[1, 2, 3].forEach(function (i) {
	slider = document.getElementById('slider-multitouch-' + i);
	noUiSlider.create(slider, {
		start: [20, 80],
		multitouch: true,
		range: {
			min: 0,
			max: 100
		}
	});
});
