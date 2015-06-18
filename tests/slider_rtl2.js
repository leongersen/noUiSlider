
	test( "RTL slider 2", function(){

		Q.innerHTML = '<div class="slider"></div>';

		var sliderElement = Q.getElementsByClassName('slider')[0],
			slider = noUiSlider.create(sliderElement, {
				range: {
					'min': 0,
					'max': 50
				},
				start: [10, 40],
				behaviour: 'tap',
				connect: true,
				direction : 'rtl'
			});

		deepEqual(slider.value.get(), ["10.00", "40.00"], "Proper start handling in RTL.");

		slider.value.set([20,30]);
		deepEqual(slider.value.get(), ["20.00", "30.00"]);

		slider.value.set([40,45]);
		deepEqual(slider.value.get(), ["40.00", "45.00"], "RTL slider overstepped properly.");

		slider.value.set([30,35]);
		deepEqual(slider.value.get(), ["30.00", "35.00"], "RTL slider understepped properly.");

	});
