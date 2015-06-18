
	QUnit.test( "Step API", function( assert ){

		function matchStep ( slider, value, steps ) {
			slider.noUiSlider.set(value);
			assert.deepEqual(slider.noUiSlider.steps()[0], steps);
		}

		function matchStepBoth ( slider, value, steps ) {
			slider.noUiSlider.set(value);
			assert.deepEqual(slider.noUiSlider.steps(), steps);
		}

		Q.innerHTML = '\
			<div id="slider1"></div>\
			<div id="slider2"></div>\
			<div id="slider3"></div>\
			<div id="slider4"></div>\
		';

		var slider1 = document.getElementById('slider1'),
			slider2 = document.getElementById('slider2'),
			slider3 = document.getElementById('slider3'),
			slider4 = document.getElementById('slider4');

		// Issue #391
		noUiSlider.create(slider1, {
			range: { min: 1.1, max: 2 },
			start: [ 1.2 ],
			step: 0.1
		});

		matchStep(slider1, 1.1, [null, 0.1]); // 1
		matchStep(slider1, 1.2, [0.1, 0.1]); // 2
		matchStep(slider1, 1.9, [0.1, 0.1]); // 3
		matchStep(slider1, 2, [0.1, null]); // 4

		// Mixed steps
		noUiSlider.create(slider2, {
			start: 40,
			step: 10,
			range: {
				'min': 0,
				'20%': [ 300, 100 ],
				'50%': [ 800, 50 ],
				'max': 1000
			}
		});

		matchStep(slider2, 0, [null, 10]); // 5
		matchStep(slider2, 10, [10, 10]); // 6
		matchStep(slider2, 40, [10, 10]); // 7
		matchStep(slider2, 190, [10, 10]); // 8
		matchStep(slider2, 300, [10, 100]); // 9
		matchStep(slider2, 400, [100, 100]); // 10
		matchStep(slider2, 700, [100, 100]); // 11
		matchStep(slider2, 800, [100, 50]); // 12
		matchStep(slider2, 850, [50, 50]); // 13
		matchStep(slider2, 950, [50, 50]); // 14
		matchStep(slider2, 1000, [50, null]); // 15

		// Small and 0 step
		noUiSlider.create(slider3, {
			start: 0.3,
			range: {
				'min': 0,
				'50%': [ 1, 0.0008 ],
				'max': 1.3
			}
		});

		matchStep(slider3, 0, [null, false]); // 16
		matchStep(slider3, 0.9999, [false, false]); // 17
		matchStep(slider3, 1, [false, 0.0008]); // 18
		matchStep(slider3, 1.0008, [0.0008, 0.0008]); //19
		matchStep(slider3, 1.2, [0.0008, 0.0008]); // 20
		matchStep(slider3, 1.3, [0.0008, null]); // 21

		// two handles
		noUiSlider.create(slider4, {
			start: [0.3, 0.9],
			range: {
				'min': 0,
				'50%': [ 1, 6 ],
				'70%': [ 8, 3 ],
				'max': 18
			}
		});

		matchStepBoth(slider4, [0, 18], [[null, false], [3, null]]); // 22
		assert.deepEqual(slider4.noUiSlider.get(), ['0.00', '18.00']); // 23
		
		matchStepBoth(slider4, [5, 9], [[6, 6], [6, 3]]); // 24
		assert.deepEqual(slider4.noUiSlider.get(), ['7.00', '8.00']); // 25
		
		matchStepBoth(slider4, [1, 16], [[false, 6], [3, 3]]); // 26
		assert.deepEqual(slider4.noUiSlider.get(), ['1.00', '17.00']); // 27
		
		matchStepBoth(slider4, [1.0008, 8], [[false, 6], [6, 3]]); // 28
		assert.deepEqual(slider4.noUiSlider.get(), ['1.00', '8.00']); // 29
		
		matchStepBoth(slider4, [1.2, 16.458], [[false, 6], [3, 3]]); // 30
		assert.deepEqual(slider4.noUiSlider.get(), ['1.00', '17.00']); // 31
		
		matchStepBoth(slider4, [1.3, 8], [[false, 6], [6, 3]]); // 32
		assert.deepEqual(slider4.noUiSlider.get(), ['1.00', '8.00']); // 33
	});
