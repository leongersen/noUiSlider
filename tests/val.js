
	test( "Testing val setting", function(){

		Q.html('\
			<div class="slider" id="slider"></div>\
		');

		var slider = $('#slider').noUiSlider({
			range: { min: -30, max: 1080 },
			start: [ 0, 10 ],
			behaviour: 'drag',
			connect: true,
			serialization: {
				format: {
					'decimals': 1
				}
			}
		});

		deepEqual(slider.val(), ["0.0", "10.0"]);

		slider.val([-10, 80]);
		deepEqual(slider.val(), ["-10.0", "80.0"]);

		slider.val(5);
		deepEqual(slider.val(), ["5.0", "80.0"]);

		slider.val([10, 980.51]);
		deepEqual(slider.val(), ["10.0", "980.5"]);

		slider.val([null]);
		deepEqual(slider.val(), ["10.0", "980.5"]);

		slider.val([null, 80]);

		slider.val([10.6]);
		deepEqual(slider.val(), ["10.6", "80.0"]);

		slider.val([null, 10.6]);
		deepEqual(slider.val(), ["10.6", "10.6"]);

		slider.val([30, null]);
		deepEqual(slider.val(), ["10.6", "10.6"]);

		slider.val(null);
		deepEqual(slider.val(), ["10.6", "10.6"]);

		slider.val(false);
		deepEqual(slider.val(), ["10.6", "10.6"]);

	});
