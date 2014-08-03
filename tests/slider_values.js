
	test( "Values", function(){

		Q.html('\
			<div class="slider"></div>\
		');

		var slider = $('.slider');

		slider.noUiSlider({
			start: [ 50, 100 ],
			connect: true,
			range: {
				'min': 30,
				'max': 986
			},
			format: TEST_ROUND_FORMAT
		});

		deepEqual( slider.val(), ['50', '100'], 'Values where set' );

		slider.val( [ 150, 600 ] );

		deepEqual( slider.val(), ['150', '600'], 'Slider correctly overstepped limits.' );

	});
