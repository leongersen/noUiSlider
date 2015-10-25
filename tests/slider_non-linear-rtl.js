
	QUnit.test( "Testing ltr and rtl non-linear", function( assert ){

		Q.innerHTML = '\
			<div class="sliderRTL"></div>\
			<div class="sliderLTR"></div>\
		';

		var sliderRTL = Q.querySelector('.sliderRTL');
		var sliderLTR = Q.querySelector('.sliderLTR');

		noUiSlider.create(sliderRTL, {
			range: {
				'min': 0,
				'30%': 5,
				'50%': [ 10, 10 ],
				'max': 50
			},
			start: 44,
			direction : 'rtl',
			format: TEST_ROUND_FORMAT
		});

		noUiSlider.create(sliderLTR, {
			range: {
				'min': 0,
				'30%': 5,
				'50%': [ 10, 10 ],
				'max': 50
			},
			start: 44,
			format: TEST_ROUND_FORMAT
		});

		equal(sliderRTL.noUiSlider.get(), '40', 'Start stepping on rtl works');
		equal(sliderLTR.noUiSlider.get(), '40', 'Start stepping on ltr works');

		sliderRTL.noUiSlider.set(42);
		sliderLTR.noUiSlider.set(42);

		equal(sliderRTL.noUiSlider.get(), '40', 'RTL slider stepped by 10 in upper half.');
		equal(sliderLTR.noUiSlider.get(), '40', 'LTR slider stepped by 10 in upper half.');

		sliderRTL.noUiSlider.set(6);
		sliderLTR.noUiSlider.set(6);

		equal(sliderRTL.noUiSlider.get(), '6', 'RTL slider didn\'t step in lower half.');
		equal(sliderLTR.noUiSlider.get(), '6', 'LTR slider didn\'t step in lower half.');
	});
