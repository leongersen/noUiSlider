
	QUnit.test( "Padding option", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var settings = {
			start: [ 0, 10 ],
			padding: 1,
			range: {
				'min': 0,
				'max': 10
			}
		};

		var slider = Q.querySelector('.slider');

		noUiSlider.create(slider, settings);

		assert.deepEqual( slider.noUiSlider.get(), ['1.00', '9.00'], 'Padding applied on init.' );

		slider.noUiSlider.set( [ 2, 10 ] );
		assert.deepEqual( slider.noUiSlider.get(), ['2.00', '9.00'], 'Handle can\'t pass padding.' );

		slider.noUiSlider.set( [ 0, 10 ] );
		assert.deepEqual( slider.noUiSlider.get(), ['1.00', '9.00'], 'Multiple set outside of padding' );

		// Rebuild with new settings;
		settings.direction = 'rtl';
		slider.noUiSlider.destroy();

		noUiSlider.create(slider, settings);

		assert.deepEqual( slider.noUiSlider.get(), ['1.00', '9.00'], 'RTL on init.' );

		slider.noUiSlider.set( [ 3, 10 ] );
		assert.deepEqual( slider.noUiSlider.get(), ['3.00', '9.00'], 'RTL set.' );
	});
