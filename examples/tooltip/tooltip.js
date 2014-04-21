// When no HTML is provided, noUiSlider creates an empty <div>
var toolTip = new Link({
	target: '-tooltip-'
});

// Otherwise, the HTML will be inserted into the handle.
// One level of HTML is supported.
var customToolTip = new Link({
	target: '-tooltip-<div class="tooltip"></div>',
	method: function ( value ) {

		// The tooltip HTML is 'this', so additional
		// markup can be inserted here.
		$(this).html(
			'<strong>Value: </strong>' +
			'<span>' + value + '</span>'
		);
	}
});

$("#tipslider").noUiSlider({
	start: [40, 50],
	range: {
		'min': 30,
		'30%': 40,
		'max': 50
	},
	serialization: {
		lower: [ toolTip ],
		upper: [ customToolTip ]
	}
});
