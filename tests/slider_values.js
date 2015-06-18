
	test( "Values", function(){

		Q.innerHTML = '<div class="slider"></div>';

		var sliderElement = Q.getElementsByClassName('slider')[0],
			slider = noUiSlider.create(sliderElement, {
			start: [ 50, 100 ],
			connect: true,
			range: {
				'min': 30,
				'max': 986
			},
			format: TEST_ROUND_FORMAT
		});

		deepEqual( slider.value.get(), ['50', '100'], 'Values where set' );

		slider.value.set( [ 150, 600 ] );

		deepEqual( slider.value.get(), ['150', '600'], 'Slider correctly overstepped limits.' );

	});
