
	QUnit.test( "Errors", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var sliders = Q.querySelectorAll('.slider'),
			slider = sliders[0];

		assert.throws(function(){
			noUiSlider.create(sliders, {
				start: [ 5 ],
				range: {
					'min': 0,
					'max': 10
				}
			});
		}, new Error('noUiSlider (' + noUiSlider.version + '): create requires a single element, got: [object NodeList]'), 'Gave a nodelist');

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: [ 5 ],
				range: {
					'min': 0,
					'max': 'nope.'
				}
			});
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: [ 5 ],
				step: 'u',
				range: {
					'min': 0,
					'max': 10
				}
			});
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: [ 5 ],
				range: {
					'min': 0
				}
			});
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: [ 5 ],
				range: 'Over 9000!!!'
			});
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: [ ],
				range: {
					'min': 0,
					'max': 10
				}
			});
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: [ 1 ],
				range: {
					'min': 0,
					'max': 10
				},
				animate: 3
			});
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: [ 1 ],
				range: {
					'min': 0,
					'max': 10
				},
				useRequestAnimationFrame: 'Hello'
			});
		}, "Should error if useRequestAnimationFrame not a boolean.");

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: 10,
				range: {
					'min': 10,
					'max': 10
				}
			});
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: 10,
				limit: 5,
				range: {
					'min': 0,
					'max': 10
				}
			});
		}, "Should error if limit enabled with only one handle.");

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: 0,
				limit: 10,
				step: 20,
				range: {
					'min': 0,
					'max': 100
				}
			});
		}, "Limit must be divisible by step.");

		noUiSlider.create(slider, {
			start: 1,
			margin: 0, // Does not throw, issue #582
			range: {
				'min': 0,
				'max': 10
			}
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: 10,
				range: {
					'min': 0,
					'max': 10
				}
			});
		}, "Should error if slider already initialised");
	});
