
	QUnit.test( "Aria", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.querySelector('.slider');

		noUiSlider.create(slider, {
			start: [ 50, 100 ],
			connect: true,
			margin: 50,
			ariaFormat: TEST_ROUND_FORMAT,
			range: {
				'min': 50,
				'max': 1050
			}
		});

		var handle0 = slider.querySelector('[data-handle="0"]');
		var handle1 = slider.querySelector('[data-handle="1"]');

		assert.equal(handle0.getAttribute('role'), 'slider');

		assert.equal(handle0.getAttribute('aria-valuemin'), '0.0', 'Handle0 min');
		assert.equal(handle0.getAttribute('aria-valuemax'), '0.0', 'Handle0 max');
		assert.equal(handle0.getAttribute('aria-valuenow'), '0.0', 'Handle0 now');
		assert.equal(handle0.getAttribute('aria-valuetext'), '50', 'Handle0 txt');

		assert.equal(handle1.getAttribute('aria-valuemin'), '5.0', 'Handle1 min');
		assert.equal(handle1.getAttribute('aria-valuemax'), '100.0', 'Handle1 max');
		assert.equal(handle1.getAttribute('aria-valuenow'), '5.0', 'Handle1 now');
		assert.equal(handle1.getAttribute('aria-valuetext'), '100', 'Handle1 txt');

	});

