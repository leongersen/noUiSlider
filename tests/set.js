
	test( "Setting values", function(){

		Q.html('\
			<div class="slider"></div>\
		');

		var slider = $('.slider');
		
		slider.noUiSlider({
			 range: {
				'min': 30,
				'max': 980
			}
			,start: [50,100]
			,connect: true
			,serialization: {
				lower: []
			}
		});

		slider.val( [ 150, 600 ] );
		
		deepEqual( slider.val(), ['150.00', '600.00'], 'Slider correctly overstepped limits.' );
		
	});
