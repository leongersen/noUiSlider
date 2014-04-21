function setColor(){

	// Get the slider values,
	// stick them together.
	var color = 'rgb(' +
		$("#red").val() + ',' +
		$("#green").val() + ',' +
		$("#blue").val() +
	')';

	// Fill the color box.
	$(".result").css({
		background: color,
		color: color
	});
}

var sliders = $('.slider');

sliders.noUiSlider({
	start: 127,
	connect: "lower",
	orientation: "vertical",
	range: {
		'min': 0,
		'max': 255
	},
	serialization: {
		format: {
			decimals: 0
		}
	}
});

// Bind the color changing function
// to the slide event.
sliders.on('slide', setColor);
