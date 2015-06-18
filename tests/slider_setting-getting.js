
	test( "Value setting/getting", function(){

		Q.innerHTML = '<div class="slider"></div>';

		var sliderElement = Q.getElementsByClassName('slider')[0],
			slider = noUiSlider.create(sliderElement, {
				range: { min: -30, max: 1080 },
				start: [ 0, 10 ],
				behaviour: 'drag',
				connect: true,
				format: {
					to: function(x){
						return x.toFixed(1);
					},
					from: Number
				}
			});

		deepEqual(slider.value.get(), ["0.0", "10.0"]);

		slider.value.set([-10, 80]);
		deepEqual(slider.value.get(), ["-10.0", "80.0"]);

		slider.value.set(5);
		deepEqual(slider.value.get(), ["5.0", "80.0"]);

		slider.value.set([10, 980.51]);
		deepEqual(slider.value.get(), ["10.0", "980.5"]);

		slider.value.set([null]);
		deepEqual(slider.value.get(), ["10.0", "980.5"]);

		slider.value.set([null, 80]);

		slider.value.set([10.6]);
		deepEqual(slider.value.get(), ["10.6", "80.0"]);

		slider.value.set([null, 10.6]);
		deepEqual(slider.value.get(), ["10.6", "10.6"]);

		slider.value.set([30, null]);
		deepEqual(slider.value.get(), ["10.6", "10.6"]);

		slider.value.set(null);
		deepEqual(slider.value.get(), ["10.6", "10.6"]);

		slider.value.set(false);
		deepEqual(slider.value.get(), ["10.6", "10.6"]);

	});
