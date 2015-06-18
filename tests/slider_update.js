
	test( "Testing update method", function(){

		Q.innerHTML = '\
			<div class="slider"></div>\
			<input class="input">';

		var sliderElement = Q.getElementsByClassName('slider')[0];

		var slider = noUiSlider.create(sliderElement, {
			range: { min: 20, max: 140 },
			start: 50,
			format: TEST_ROUND_FORMAT
		});

		deepEqual(slider.value.get(), '50');

		slider.destroy();

		equal(sliderElement.innerHTML, '', 'Slider was cleared');

		equal ( slider.value.get(), '', 'Slider has no value' );

		var settings = {
			range: { min: 30, max: 70 },
			start: [ 30, 60 ],
			format: TEST_ROUND_FORMAT
		};

		slider = noUiSlider.create(sliderElement, settings);

		deepEqual(slider.value.get(), ['30', '60']);

		slider.value.set(70);
		deepEqual(slider.value.get(), ['60', '60']);

		slider.value.set(40);
		deepEqual(slider.value.get(), ['40', '60']);

		equal ( sliderElement.getElementsByClassName('noUi-connect').length, 0, 'Slider uses no connection' );

		settings.connect = true;
		slider.destroy();
		slider = noUiSlider.create(sliderElement, settings);

		equal ( sliderElement.getElementsByClassName('noUi-connect').length, 1, 'Slider now connects' );

		deepEqual(slider.value.get(), ['40', '60'], 'Value was unchanged');

		slider.value.set([30,50]);
		deepEqual(slider.value.get(), ['30', '50'], 'Can still set slider');

	//	slider.destroy();

	//	ok ( !slider.destroy, 'destroy method removed itself');

	//	slider.noUiSlider({
	//		start: 30,
	//		range: { min: 80, max: 1000 }
	//	});
    //
	//	equal(slider.value.get(), '80.00', 'Slider was build, ignoring the rebuild flag.');

	});
