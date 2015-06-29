
	QUnit.test( "Values", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.getElementsByClassName('slider')[0];

		noUiSlider.create(slider, {
			start: [ 50, 100 ],
			connect: true,
			format: TEST_ROUND_FORMAT,
			range: {
				'min': 30,
				'max': 986
			}
		});

		assert.deepEqual( slider.noUiSlider.get(), ['50', '100'], 'Values where set' );

		slider.noUiSlider.set( [ 150, 600 ] );

		assert.deepEqual( slider.noUiSlider.get(), ['150', '600'], 'Slider correctly overstepped limits.' );

	});
