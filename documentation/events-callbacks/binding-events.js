var lSlide = document.getElementById('l-slide'),
	lSet = document.getElementById('l-set'),
	lChange = document.getElementById('l-change');

slider.on('slide', function(){
	addClassFor(lSlide, 'tShow', 450);
});

slider.on('set', function(){
	addClassFor(lSet, 'tShow', 450);
});

slider.on('change', function(){
	addClassFor(lChange, 'tShow', 450);
});
