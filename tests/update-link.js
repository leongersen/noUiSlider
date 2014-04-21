
	test( "Testing update method", function(){

		Q.html('\
			<div id="slider"></div>\
			<input id="input1">\
			<input id="input2">\
		');

		var slider = $("#slider"),
			input1 = $("#input1"),
			input2 = $("#input2");

		var itemCustom = $.Link({
			target: $('#input1'),
			format: {
				prefix: '$',
				mark: ',',
				decimals: 3,
				to: function( value ) {
					return 'Hi! ' + value;
				},
				from: function( value ) {
					return value.slice(4);
				}
			}
		});

		var itemInherit = $.Link({
			target: $('#input2')
		});

		slider.noUiSlider({
			range: { min: 30, max: 120 },
			start: [ 50, 100 ],
			serialization: {
				lower: [ itemCustom ],
				upper: [ itemInherit ],
				format: {
					prefix: '€',
					mark: '*'
				}
			}
		});

		deepEqual(slider.val(), ["€50*00", "€100*00"]);
		equal(input1.val(), "Hi! $50,000");
		equal(input2.val(), "€100*00");

		slider.val([32, 118]);
		deepEqual(slider.val(), ["€32*00", "€118*00"]);

		input1.val("Hi! $60,000").change();
		deepEqual(slider.val(), ["€60*00", "€118*00"]);

		slider.noUiSlider({ range: { min: 20, max: 130 } }, true);
		deepEqual(slider.val(), ["€60*00", "€118*00"]);
	});
