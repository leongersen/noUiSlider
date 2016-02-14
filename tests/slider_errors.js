
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
		});

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
				start: [ 1, 2, 3 ],
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
				connect: true
			});
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: 10,
				connect: false,
				behaviour: 'drag',
				range: {
					'min': 0,
					'max': 10
				}
			});
		});

		assert.throws(function(){
			noUiSlider.create(slider, {
				start: 10,
				range: {
					'min': 10,
					'max': 10
				}
			});
		});

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
		});
	});
