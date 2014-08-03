function toggle( value ){
	$(this).toggleClass('off', value === "1");
}

$("#slider-toggle").noUiSlider({
	orientation: "vertical",
	start: 0,
	range: {
		'min': [0, 1],
		'max': 1
	},
	format: wNumb({
		decimals: 0
	})
})

$("#slider-toggle").addClass('toggle');

$("#slider-toggle").Link('lower').to(toggle);
