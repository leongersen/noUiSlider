
	test( "Testing handling of odd-numbered steps", function(){

		Q.innerHTML = '<div class="slider"></div>';

		var sliderElement = Q.getElementsByClassName('slider')[0],
			slider = noUiSlider.create(sliderElement, {
				range: { min: 3, max: 106 },
				start: [ 20, 50 ],
				step: 10,
				format: TEST_ROUND_FORMAT
			});

		deepEqual( slider.value.get(), ['23', '53'] );

		slider.value.set([50, 106]);
		deepEqual( slider.value.get(), ['53', '106'], 'Slider reached edge outside from step.' );

		slider.value.set([71, 105]);
		deepEqual( slider.value.get(), ['73', '103'], 'Slider steps back into stepping with lower points as origin.' );

		slider.value.set([71, 101]);
		deepEqual( slider.value.get(), ['73', '103'] );
	});
