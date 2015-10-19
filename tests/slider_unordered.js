
	QUnit.test( "Unordered slider range", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.querySelector('.slider');

		noUiSlider.create(slider, {
			start: [ 12 ],
			format: TEST_ROUND_FORMAT,
			range: {
				'50%': 16,
				'min': 11,
				'10%': 12,
				'max': 20
			}
		});

		slider.noUiSlider.set(11);
		equal(slider.noUiSlider.get(), 11);

		slider.noUiSlider.set(12);
		equal(slider.noUiSlider.get(), 12);

		slider.noUiSlider.set(16);
		equal(slider.noUiSlider.get(), 16);
	});
