
	QUnit.test( "Slider with three or more handles", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.querySelector('.slider');

		noUiSlider.create(slider, {
			start: [ 5, 10, 15 ],
			range: {
				'min': [0, 1],
				'max': [20]
			}
		});

		assert.deepEqual(slider.noUiSlider.get().map(Number), [5, 10, 15]);

		slider.noUiSlider.set([0, 0, 1]);
		assert.deepEqual(slider.noUiSlider.get().map(Number), [0, 0, 1]);

		slider.noUiSlider.set([19, 20, 20]);
		assert.deepEqual(slider.noUiSlider.get().map(Number), [19, 20, 20]);
	});
