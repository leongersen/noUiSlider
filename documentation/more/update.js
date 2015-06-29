var buttons = document.getElementsByClassName('update-button');

function rebuildSlider ( ) {

	// Get the new values from the button.
	var range = this.getAttribute('data-range').split(','),
		val = updateSlider.noUiSlider.get();

	updateSlider.noUiSlider.destroy();

	// Create a slider with the new options.
	settings.range.min = Number(range[0]);
	settings.range.max = Number(range[1]);
	settings.start = Number(val);

	noUiSlider.create(updateSlider, settings);

	bindValue();
}

buttons[0].addEventListener('click', rebuildSlider);
buttons[1].addEventListener('click', rebuildSlider);
