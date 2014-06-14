
	test( "Testing update method", function(){

		Q.html('\
			<div class="slider"></div>\
			<input class="input">\
		');

		var slider = $('.slider'),
			input = $('.input');

		slider.noUiSlider({
			range: {
				'min': 30,
				'max': 980
			},
			start: [-3000, 1000],
			connect: true,
			format: wNumb({
				encoder: function( value ){
					console.log('en', value, 3 * Number(value));
					return 3 * Number(value);
				},
				decoder: function( value ){
					console.log('de', value);
					return Number(value) / 3;
				},
				mark: '|',
				decimals: 4
			})
		});
		
		slider.Link('lower', {
			target: input
		});
		
		slider.Link('upper', {
			target: "newInput"
		});

		deepEqual( slider.val(), ['90|0000', '1000|0000'], 'Slider handles encoder values.' );
		equal( Q.find('input[name="newInput"]').val(), '1000|0000', 'Input has proper value.');

		equal( Q.find('input').length, 2 );

		slider.noUiSlider({
			range: {
				'min': -50,
				'max': 6000
			},
			start: [ -40, 1500 ],
			format: wNumb({
				mark: '.',
				decimals: 2
			})
		}, true);

		equal( Q.find('input').length, 2, 'Hidden input is still available.' );
	
		equal( Q.find('input[name="newInput"]').length, 1 );
	
		// As of noUiSlider 7, the input method doesn't remove Links.
	//equal( Q.find('input.input').val(), '90|0000', "Input didn't update." );

		deepEqual( slider.val(), ['-40.00', '1500.00'], 'Slider has new settings.' );

	});
