var marginMin = document.getElementById('slider-margin-value-min'),
	marginMax = document.getElementById('slider-margin-value-max');

marginSlider.on('update', function ( values, handle, pure_values ) {

	var value = values[handle];

	if ( handle ) {
		marginMax.innerHTML = value;
	} else {
		marginMin.innerHTML = value;
	}
});
