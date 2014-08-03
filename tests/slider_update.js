
	test( "Testing update method", function(){

		Q.html('\
			<div class="slider"></div>\
			<input class="input">\
		');

		var slider = $('.slider');

		slider.noUiSlider({
			range: { min: 20, max: 140 },
			start: 50,
			format: TEST_ROUND_FORMAT
		});

		deepEqual(slider.val(), '50');

		slider[0].destroy();

		ok(slider.is(':empty'), 'Slider was cleared');

		equal ( slider.val(), '', 'Slider has no value' );

		slider.noUiSlider({
			range: { min: 30, max: 70 },
			start: [ 30, 60 ],
			format: TEST_ROUND_FORMAT
		});

		deepEqual(slider.val(), ['30', '60']);

		slider.val(70);
		deepEqual(slider.val(), ['60', '60']);

		slider.val(40);
		deepEqual(slider.val(), ['40', '60']);

		equal ( slider.find('.noUi-connect').length, 0, 'Slider uses no connection' );

		slider.noUiSlider({
			connect: true
		}, true);

		equal ( slider.find('.noUi-connect').length, 1, 'Slider now connects' );

		deepEqual(slider.val(), ['40', '60'], 'Value was unchanged');

		slider.val([30,50]);
		deepEqual(slider.val(), ['30', '50'], 'Can still set slider');

		slider[0].destroy();

		ok ( !slider[0].destroy, 'destroy method removed itself');
		
		slider.noUiSlider({
			start: 30,
			range: { min: 80, max: 1000 }
		}, true);

		equal(slider.val(), '80.00', 'Slider was build, ignoring the rebuild flag.');

	});
