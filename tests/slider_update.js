
	QUnit.test( "Testing update method", function( assert ){

		Q.innerHTML = '\
			<div class="slider"></div>\
			<input class="input">';

		var slider = Q.querySelector('.slider');

		noUiSlider.create(slider, {
			range: { min: 20, max: 140 },
			start: 50,
			format: TEST_ROUND_FORMAT
		});

		assert.deepEqual(slider.noUiSlider.get(), '50');

		slider.noUiSlider.destroy();

		equal(slider.innerHTML, '', 'Slider was cleared');

		var settings = {
			range: { min: 30, max: 70 },
			start: [ 30, 60 ],
			format: TEST_ROUND_FORMAT
		};

		noUiSlider.create(slider, settings);

		assert.deepEqual(slider.noUiSlider.get(), ['30', '60']);

		slider.noUiSlider.set(70);
		assert.deepEqual(slider.noUiSlider.get(), ['70', '70']);

		slider.noUiSlider.set(40);
		assert.deepEqual(slider.noUiSlider.get(), ['40', '70']);

		equal ( slider.querySelectorAll('.noUi-connect').length, 0, 'Slider uses no connection' );

		settings.connect = true;
		slider.noUiSlider.destroy();

		noUiSlider.create(slider, settings);

		equal ( slider.querySelectorAll('.noUi-connect').length, 1, 'Slider now connects' );

		assert.deepEqual(slider.noUiSlider.get(), ['30', '60'], 'Value was unchanged');

		slider.noUiSlider.set([30,50]);
		assert.deepEqual(slider.noUiSlider.get(), ['30', '50'], 'Can still set slider');
	});
