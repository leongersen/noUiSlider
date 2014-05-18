
	test( "Testing handling of odd-numbered steps", function(){

		Q.html('\
			<div class="slider"></div>\
		');

		var slider = $('.slider');

		slider.noUiSlider({
			range: { min: 3, max: 106 },
			start: [ 20, 50 ],
			step: 10
		});

		deepEqual( slider.val(), ['23.00', '53.00'] );

		slider.val([50, 106]);
		deepEqual( slider.val(), ['53.00', '106.00'], 'Slider reached edge outside from step.' );

		slider.val([71, 105]);
		deepEqual( slider.val(), ['73.00', '103.00'], 'Slider steps back into stepping with lower points as origin.' );

		slider.val([71, 101]);
		deepEqual( slider.val(), ['73.00', '103.00'] );
	});
