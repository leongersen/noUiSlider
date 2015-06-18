
	test( "Step API", function(){

		function matchStep ( slider, value, steps ) {
			slider.value.set(value);
			deepEqual(slider.steps()[0], steps);
		}
		
		function matchStepBoth ( slider, value, steps ) {
			slider.value.set(value);
			deepEqual(slider.steps(), steps);
		}

		Q.innerHTML = '\
			<div id="slider1"></div>\
			<div id="slider2"></div>\
			<div id="slider3"></div>\
			<div id="slider4"></div>\
		';

		var slider1Element = document.getElementById('slider1'),
			slider2Element = document.getElementById('slider2'),
			slider3Element = document.getElementById('slider3'),
			slider4Element = document.getElementById('slider4');

		// Issue #391
		var slider1 = noUiSlider.create(slider1Element, {
			range: { min: 1.1, max: 2 },
			start: [ 1.2 ],
			step: 0.1
		});

		matchStep(slider1, 1.1, [null, 0.1]);
		matchStep(slider1, 1.2, [0.1, 0.1]);
		matchStep(slider1, 1.9, [0.1, 0.1]);
		matchStep(slider1, 2, [0.1, null]);

		// Mixed steps
		var slider2 = noUiSlider.create(slider2Element, {
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
		var slider3 = noUiSlider.create(slider3Element, {
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

		// two handles
		var slider4 = noUiSlider.create(slider4Element, {
			start: [0.3, 0.9],
			range: {
				'min': 0,
				'50%': [ 1, 6 ],
				'70%': [ 1, 12 ],
				'max': 18
			}
		});

		matchStepBoth(slider4, [0, 18], [[null, false], [false, null]]);
		matchStepBoth(slider4, [5, 9], [[false, false], [1, 1]]);
		matchStepBoth(slider4, [1, 16], [[false, false], [false, false]]);
		matchStepBoth(slider4, [1.0008, 8], [[0.0008, 0.0008], [null, false]]);
		matchStepBoth(slider4, [1.2, 16.458], [[0.0008, 0.0008], [null, false]]);
		matchStepBoth(slider4, [1.3, 8], [[0.0008, null], [null, false]]);
	});
