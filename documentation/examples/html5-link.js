var inputNumber = document.getElementById('input-number');

html5Slider.on('update', function( values, handle ) {

	var value = values[handle];

	if ( handle ) {
		inputNumber.value = value;
	} else {
		select.value = Math.round(value);
	}
});

select.addEventListener('change', function(){
	html5Slider.value.set([this.value, null]);
});

inputNumber.addEventListener('change', function(){
	html5Slider.value.set([null, this.value]);
});
