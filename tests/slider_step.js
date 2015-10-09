
	QUnit.test( "Testing handling of odd-numbered steps", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.querySelector('.slider');

		noUiSlider.create(slider, {
			range: { min: 3, max: 106 },
			start: [ 20, 50 ],
			step: 10,
			format: TEST_ROUND_FORMAT
		});

		assert.deepEqual( slider.noUiSlider.get(), ['23', '53'] );

		slider.noUiSlider.set([50, 106]);
		assert.deepEqual( slider.noUiSlider.get(), ['53', '106'], 'Slider reached edge outside from step.' );

		slider.noUiSlider.set([71, 105]);
		assert.deepEqual( slider.noUiSlider.get(), ['73', '103'], 'Slider steps back into stepping with lower points as origin.' );

		slider.noUiSlider.set([71, 101]);
		assert.deepEqual( slider.noUiSlider.get(), ['73', '103'] );
	});
