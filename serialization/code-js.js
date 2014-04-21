$("#rangeSlider").noUiSlider({
	start: [ 950, 5060 ],
	range: {
		'min': 50,
		'max': 5960
	},
	connect: true,
	serialization: {

		lower: [

			new Link({
				// Place the value in the #value element,
				// using the text method.
				target: $("#value"),
				method: "text"
			}),

			new Link({
				target: $(".inputClass"),
				format: {
					// Prefix the value with an Euro symbol
					prefix: '\u20AC',
					// Write the value using 1 decimal.
					decimals: 0,
					postfix: ',-'
				}
			})

		],

		upper: [

			new Link({
				// Link accepts functions too.
				// The arguments are the slider value,
				// the .noUi-handle element and the slider instance.
				target: function( value, handleElement, slider ){

					$("#someElement").text( value );

				}
			}),

			new Link({
				// When you pass a string to a link,
				// it will create a hidden input.
				// You'll see the value appear when you
				// alert the form contents.
				target: "inputName"
			})

		],

		// Set some default formatting options.
		// These options will be applied to any Link
		// that doesn't overwrite these values.
		format: {
			decimals: 1
		}

	}
});

$('button').click(function(){
	// Use jQuery to make get the values from the form.
	// We'll decode the generated URL to keep it readable.
	alert(decodeURIComponent( $("#moneyForm").serialize() ));
	
	// Don't submit the form.
	return false;
});
