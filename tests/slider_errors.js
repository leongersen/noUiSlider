
	QUnit.test( "Errors", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var sliders = Q.getElementsByClassName('slider'),
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

		noUiSlider.create(slider, {
			start: 1,
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
