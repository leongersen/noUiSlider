var lUpdate = document.getElementById('l-update'),
	lSlide = document.getElementById('l-slide'),
	lSet = document.getElementById('l-set'),
	lChange = document.getElementById('l-change');

slider.noUiSlider.on('update', function(){
	addClassFor(lUpdate, 'tShow', 450);
});

slider.noUiSlider.on('slide', function(){
	addClassFor(lSlide, 'tShow', 450);
});

slider.noUiSlider.on('set', function(){
	addClassFor(lSet, 'tShow', 450);
});

slider.noUiSlider.on('change', function(){
	addClassFor(lChange, 'tShow', 450);
});
