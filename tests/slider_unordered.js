
	test( "Unordered slider range", function(){

		Q.html('\
			<div class="slider"></div>\
		');

		var slider = Q.find('.slider');

		slider.noUiSlider({
			range: {
				'50%': 16,
				'min': 11,
				'10%': 12,
				'max': 20
			},
			start: [ 12 ],
			format: TEST_ROUND_FORMAT
		});

		equal(slider.val(11).val(), 11);
		equal(slider.find('.noUi-origin')[0].style.left, '0%');
		equal(slider.val(12).val(), 12);
		equal(slider.find('.noUi-origin')[0].style.left, '10%');
		equal(slider.val(16).val(), 16);
		equal(slider.find('.noUi-origin')[0].style.left, '50%');
	});
