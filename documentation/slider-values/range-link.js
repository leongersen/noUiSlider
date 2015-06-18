var rangeSliderValueElement = document.getElementById('slider-range-value');

rangeSlider.noUiSlider.on('update', function( values, handle, unencoded ) {
	rangeSliderValueElement.innerHTML = values[handle] + ', ' + unencoded;
});
