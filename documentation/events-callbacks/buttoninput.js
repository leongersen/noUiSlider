setter.addEventListener('click', function(){
	slider.noUiSlider.set([5, 15]);
});

slider.noUiSlider.on('update', function ( values, handle ) {
	if ( handle == 0 ) {
		inputLog.value = values[handle];
	}
});

inputLog.addEventListener('change', function ( ) {
	slider.noUiSlider.set([null, this.value]);
});
