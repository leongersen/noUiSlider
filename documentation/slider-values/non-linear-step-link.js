var nonLinearStepSliderValueElement = document.getElementById('slider-non-linear-step-value');

nonLinearStepSlider.noUiSlider.on('update', function( values, handle ) {
	nonLinearStepSliderValueElement.innerHTML = values[handle];
});
