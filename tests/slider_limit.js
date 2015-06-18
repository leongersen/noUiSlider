
	test( "Limit option", function(){

		Q.innerHTML = '<div class="slider"></div>';

		var settings = {
			start: [ 50, 100 ],
			limit: 30,
			range: {
				'min': 30,
				'max': 986
			}
		};

		var sliderElement = Q.getElementsByClassName('slider')[0],
			slider = noUiSlider.create(sliderElement, settings);

		console.log(settings);

		deepEqual( slider.value.get(), ['50.00', '80.00'], 'Limit applied on init.' );

		slider.value.set( [ null, 600 ] );
		deepEqual( slider.value.get(), ['50.00', '80.00'], 'Handle can\'t leave limit.' );

		slider.value.set( [ 150, 600 ] );
		deepEqual( slider.value.get(), ['150.00', '180.00'], 'Multiple set limit.' );

		// Rebuild with new settings;
		settings.direction = 'rtl';
		slider.destroy();

		slider = noUiSlider.create(sliderElement, settings);

		deepEqual( slider.value.get(), ['150.00', '180.00'], 'Re-init rtl keeps value.' );

		slider.value.set( [ 120, 240 ] );
		deepEqual( slider.value.get(), ['120.00', '150.00'], 'RTL set.' );
	});
