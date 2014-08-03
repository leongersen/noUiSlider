
	test( "Testing handling of odd-numbered steps", function(){

		Q.html('\
			<div class="slider"></div>\
		');

		var slider = $('.slider');

		slider.noUiSlider({
			range: { min: 3, max: 106 },
			start: [ 20, 50 ],
			step: 10,
			format: TEST_ROUND_FORMAT
		});

		deepEqual( slider.val(), ['23', '53'] );

		slider.val([50, 106]);
		deepEqual( slider.val(), ['53', '106'], 'Slider reached edge outside from step.' );

		slider.val([71, 105]);
		deepEqual( slider.val(), ['73', '103'], 'Slider steps back into stepping with lower points as origin.' );

		slider.val([71, 101]);
		deepEqual( slider.val(), ['73', '103'] );
	});
