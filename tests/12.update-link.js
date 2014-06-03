
	test( "Testing update method", function(){

		Q.html('\
			<div id="slider"></div>\
			<input id="input1">\
			<input id="input2">\
		');

		var slider = $("#slider"),
			input1 = $("#input1"),
			input2 = $("#input2");

		slider.noUiSlider({
			range: {
				min: 30,
				max: 120
			},
			start: [ 50, 100 ],
			format: wNumb({
				prefix: '€',
				mark: '*',
				decimals: 2
			})
		});
		
		slider.Link('lower', {
			target: $('#input1'),
			format: wNumb({
				prefix: '$',
				mark: ',',
				decimals: 3,
				edit: function( value ) {
					return 'Hi! ' + value;
				},
				undo: function( value ) {
					return value.slice(4);
				}
			})
		});

		slider.Link('upper', {
			target: $('#input2')
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
