
	test( "Testing ltr and rtl non-linear", function(){

		Q.html('\
			<div class="sliderRTL"></div>\
			<div class="sliderLTR"></div>\
		');

		var sliderRTL = $('.sliderRTL');
		var sliderLTR = $('.sliderLTR');

		sliderRTL.noUiSlider({
			range: {
				'min': 0,
				'30%': 5,
				'50%': [ 10, 10 ],
				'max': 50
			},
			start: 44,
			direction : 'rtl',
			serialization: {
				format: { decimals: 0 }
			}
		});

		sliderLTR.noUiSlider({
			range: {
				'min': 0,
				'30%': 5,
				'50%': [ 10, 10 ],
				'max': 50
			},
			start: 44,
			serialization: {
				format: { decimals: 0 }
			}
		});

		equal(sliderRTL.val(), '40', 'Start stepping on rtl works');
		equal(sliderLTR.val(), '40', 'Start stepping on ltr works');

		sliderRTL.val(42);
		sliderLTR.val(42);

		equal(sliderRTL.val(), '40', 'RTL slider stepped by 10 in upper half.');
		equal(sliderLTR.val(), '40', 'LTR slider stepped by 10 in upper half.');

		sliderRTL.val(6);
		sliderLTR.val(6);

		equal(sliderRTL.val(), '6', 'RTL slider didn\'t step in lower half.');
		equal(sliderLTR.val(), '6', 'LTR slider didn\'t step in lower half.');
	});
