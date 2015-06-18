
	test( "Testing ltr and rtl non-linear", function(){

		Q.innerHTML = '\
			<div class="sliderRTL"></div>\
			<div class="sliderLTR"></div>\
		';

		var sliderRTLElement = Q.getElementsByClassName('sliderRTL')[0];
		var sliderLTRElement = Q.getElementsByClassName('sliderLTR')[0];

		var sliderRTL = noUiSlider.create(sliderRTLElement, {
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

		var sliderLTR = noUiSlider.create(sliderLTRElement, {
			range: {
				'min': 0,
				'30%': 5,
				'50%': [ 10, 10 ],
				'max': 50
			},
			start: 44,
			format: TEST_ROUND_FORMAT
		});

		equal(sliderRTL.value.get(), '40', 'Start stepping on rtl works');
		equal(sliderLTR.value.get(), '40', 'Start stepping on ltr works');

		sliderRTL.value.set(42);
		sliderLTR.value.set(42);

		equal(sliderRTL.value.get(), '40', 'RTL slider stepped by 10 in upper half.');
		equal(sliderLTR.value.get(), '40', 'LTR slider stepped by 10 in upper half.');

		sliderRTL.value.set(6);
		sliderLTR.value.set(6);

		equal(sliderRTL.value.get(), '6', 'RTL slider didn\'t step in lower half.');
		equal(sliderLTR.value.get(), '6', 'LTR slider didn\'t step in lower half.');
	});
