var element = document.getElementById('range');

var slider = noUiSlider.create(element, {
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


slider.on('slide.handle', function( values, handle ){
	console.log('Slide on handle ' + handle);
});

/*
slider.on('slide.pike_cake', function( myBind ){
	console.log(myBind + 2);
});
*/


var valueInput = document.getElementById('value-input'),
	valueSpan = document.getElementById('value-span');

slider.on('update', function( values, handle, unencoded ) {

	console.log(values, handle);

	var value = values[handle];

	if ( handle ) {
		valueInput.value = value;
	} else {
		valueSpan.innerHTML = value;
	}
});

valueInput.addEventListener('change', function(){
	slider.value.set([null, this.value]);
});
