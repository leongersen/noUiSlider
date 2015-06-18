function setColor(){

	// Get the slider values,
	// stick them together.
	var color = 'rgb(' +
		sliders[0].noUiSlider.get() + ',' +
		sliders[1].noUiSlider.get() + ',' +
		sliders[2].noUiSlider.get() + ')';

	// Fill the color box.
	resultElement.style.background = color;
	resultElement.style.color = color;
}
