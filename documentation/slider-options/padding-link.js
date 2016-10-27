var paddingMin = document.getElementById('slider-padding-value-min'),
	paddingMax = document.getElementById('slider-padding-value-max');

paddingSlider.noUiSlider.on('update', function ( values, handle ) {
	if ( handle ) {
		marginMax.innerHTML = values[handle];
	} else {
		marginMin.innerHTML = values[handle];
	}
});
