function setColor(){

	// Get the slider values,
	// stick them together.
	var color = 'rgb(' +
		sliders[0].value.get() + ',' +
		sliders[1].value.get() + ',' +
		sliders[2].value.get() + ')';

	// Fill the color box.
	resultElement.style.background = color;
	resultElement.style.color = color;
}
