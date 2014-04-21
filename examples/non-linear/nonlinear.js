// Write the CSS 'left' value to a span.
function leftValue ( value, handle, slider ) {
	$(this).text( handle.parent()[0].style.left );
}

$("#nonlinear").noUiSlider({
	connect: true,
	behaviour: 'tap',
	start: [ 500, 4000 ],
	range: {
		'min': [ 0 ],
		'10%': [ 500, 500 ],
		'50%': [ 4000, 1000 ],
		'max': [ 10000 ]
	},
	serialization: {
		lower: [
			new Link ({
				target: $('#lower-value')
			}),
			new Link ({
				target: $('#lower-offset'),
				method: leftValue
			})
		],
		upper: [
			new Link ({
				target: $('#upper-value')
			}),
			new Link ({
				target: $('#upper-offset'),
				method: leftValue
			})
		]
	}
});
