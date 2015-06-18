
	test( "Unordered slider range", function(){

		Q.innerHTML = '<div class="slider"></div>';

		var sliderElement = Q.getElementsByClassName('slider')[0],
			slider = noUiSlider.create(sliderElement, {
				range: {
					'50%': 16,
					'min': 11,
					'10%': 12,
					'max': 20
				},
				start: [ 12 ],
				format: TEST_ROUND_FORMAT
			});

		slider.value.set(11);
		equal(slider.value.get(), 11);
		equal(sliderElement.getElementsByClassName('noUi-origin')[0].style.left, '0%');
		
		slider.value.set(12);
		equal(slider.value.get(), 12);
		equal(sliderElement.getElementsByClassName('noUi-origin')[0].style.left, '10%');
		
		slider.value.set(16);
		equal(slider.value.get(), 16);
		equal(sliderElement.getElementsByClassName('noUi-origin')[0].style.left, '50%');
	});
