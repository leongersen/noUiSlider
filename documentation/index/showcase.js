var slider = document.getElementById('range'),
	valueInput = document.getElementById('value-input'),
	valueSpan = document.getElementById('value-span');

noUiSlider.create(slider, {
	start: [ 20, 80 ],
	step: 10,
	margin: 20,
	connect: true,
	direction: 'rtl',
	orientation: 'vertical',
	behaviour: 'tap-drag',
	range: {
		'min': 0,
		'max': 100
	},
	pips: {
		mode: 'steps',
		density: 2
	}
});

slider.noUiSlider.on('update', function( values, handle ) {
	if ( handle ) {
		valueInput.value = values[handle];
	} else {
		valueSpan.innerHTML = values[handle];
	}
});

valueInput.addEventListener('change', function(){
	slider.value.set([null, this.value]);
});
