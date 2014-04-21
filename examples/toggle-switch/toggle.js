function toggle( value ){
	$(this).toggleClass('off', value === "1");
}

$("#toggle").noUiSlider({
	orientation: "vertical",
	start: 0,
	range: {
		'min': [0, 1],
		'max': 1
	},
	serialization: {
		lower: [
			new Link({
				target: toggle
			})
		],
		format: {
			decimals: 0
		}
	}
}).addClass('toggle');
