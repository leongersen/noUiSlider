
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
			}
			,start: [-3000, 1000]
			,connect: true
			,serialization: {
				lower: [
					new Link({
						target: input
					})
				],
				upper: [
					new Link({
						target: "newInput"
					})
				],
				format: {
					encoder: function( value ){
						return 3 * Number(value);
					},
					decoder: function( value ){
						return Number(value) / 3;
					},
					mark: '|',
					decimals: 4
				}
			}
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
			serialization: {
				format: {
					mark: '.',
					decimals: 2
				}
			}
		}, true);

		equal( Q.find('input').length, 1, 'Hidden input is gone.' );
		equal( Q.find('input.input').val(), '90|0000', "Input didn't update." );

		deepEqual( slider.val(), ['-40.00', '1500.00'], 'Slider has new settings.' );

	});
