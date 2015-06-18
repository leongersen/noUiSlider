function addClassFor ( element, className, duration ) {
	element.classList.add(className);
	setTimeout(function(){
		element.classList.remove(className);
	}, duration);
}

var element = document.getElementById('slider-events'),
	setter = document.getElementById('setter1'),
	slider = noUiSlider.create(element, {
		start: [ 0, 10 ],
		range: {
			'min': [ 0 ],
			'max': [ 20 ]
		}
	});

setter.addEventListener('click', function(){
	slider.value.set([5, 15]);
});

// $("#slider-events").Link('lower').to($("#input-log"));

var inputEvent = document.getElementById('input-log');

slider.on('update', function ( values, handle ) {
	if ( !handle ) {
		inputEvent.value = values[handle];
	}
});

inputEvent.addEventListener('change', function ( ) {
	slider.value.set([null, this.value]);
});
