
	test( "Step API", function(){

		function matchStep ( slider, value, steps ) {
			slider.val(value);
			deepEqual(slider.noUiSlider('step')[0], steps);
		}

		Q.html('\
			<div class="slider1"></div>\
			<div class="slider2"></div>\
			<div class="slider3"></div>\
		');

		var slider1 = Q.find('.slider1'), slider2 = Q.find('.slider2'), slider3 = Q.find('.slider3');

		// Issue #391
		slider1.noUiSlider({
			range: { min: 1.1, max: 2 },
			start: [ 1.2 ],
			step: 0.1
		});

		matchStep(slider1, 1.1, [null, 0.1]);
		matchStep(slider1, 1.2, [0.1, 0.1]);
		matchStep(slider1, 1.9, [0.1, 0.1]);
		matchStep(slider1, 2, [0.1, null]);

		// Mixed steps
		slider2.noUiSlider({
			start: 40,
			step: 10,
			range: {
				'min': 0,
				'20%': [ 300, 100 ],
				'50%': [ 800, 50 ],
				'max': 1000
			}
		});

		matchStep(slider2, 0, [null, 10]);
		matchStep(slider2, 10, [10, 10]);
		matchStep(slider2, 40, [10, 10]);
		matchStep(slider2, 190, [10, 10]);
		matchStep(slider2, 300, [10, 100]);
		matchStep(slider2, 400, [100, 100]);
		matchStep(slider2, 700, [100, 100]);
		matchStep(slider2, 800, [100, 50]);
		matchStep(slider2, 850, [50, 50]);
		matchStep(slider2, 950, [50, 50]);
		matchStep(slider2, 1000, [50, null]);

		// Small and 0 step
		slider3.noUiSlider({
			start: 0.3,
			range: {
				'min': 0,
				'50%': [ 1, 0.0008 ],
				'max': 1.3
			}
		});

		matchStep(slider3, 0, [null, false]);
		matchStep(slider3, 0.9999, [false, false]);
		matchStep(slider3, 1, [false, 0.0008]);
		matchStep(slider3, 1.0008, [0.0008, 0.0008]);
		matchStep(slider3, 1.2, [0.0008, 0.0008]);
		matchStep(slider3, 1.3, [0.0008, null]);
	});
