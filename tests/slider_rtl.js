
	test( "RTL slider multiple value set.", function(){

		Q.innerHTML = '<div class="slider"></div>';

		var sliderElement = Q.getElementsByClassName('slider')[0],
			slider = noUiSlider.create(sliderElement, {
				range: {min: 0.201, max: 1},
				step: 0.01,
				start: 0.401,
				direction: "rtl",
				orientation: "vertical",
				format: {
					to: function(x){
						return x.toFixed(1);
					},
					from: Number
				}
			});

		equal(slider.value.get(), 0.4);

		slider.value.set(0.201);
		equal(slider.value.get(), 0.2);

		slider.value.set(0.201);
		equal(slider.value.get(), 0.2);
	});
