
	QUnit.test( "Unordered slider range", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.getElementsByClassName('slider')[0];

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
		equal(slider.getElementsByClassName('noUi-origin')[0].style.left, '0%');

		slider.noUiSlider.set(12);
		equal(slider.noUiSlider.get(), 12);
		equal(slider.getElementsByClassName('noUi-origin')[0].style.left, '10%');

		slider.noUiSlider.set(16);
		equal(slider.noUiSlider.get(), 16);
		equal(slider.getElementsByClassName('noUi-origin')[0].style.left, '50%');
	});
