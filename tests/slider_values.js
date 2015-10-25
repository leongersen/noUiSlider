
	QUnit.test( "Values", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.querySelector('.slider');

		noUiSlider.create(slider, {
			start: [ 50, 100 ],
			connect: true,
			format: TEST_ROUND_FORMAT,
			range: {
				'min': 30,
				'max': 986
			}
		});

		assert.deepEqual( slider.noUiSlider.get(), ['50', '100'], 'Values where set' );

		slider.noUiSlider.set( [ 150, 600 ] );

		assert.deepEqual( slider.noUiSlider.get(), ['150', '600'], 'Slider correctly overstepped limits.' );

	});

/*	The two tests show some problems with enormous numbers in JavaScript.
	I've decided not the attempt to work around these issues, instead documenting
	them and providing a work-around.

	QUnit.test( "Values, Accuracy With Large Numbers 1", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.getElementsByClassName('slider')[0];

		noUiSlider.create(slider, {
			start: [ 1, 8301034833169290000 ],
			connect: true,
			format: TEST_ROUND_FORMAT,
			range: {
				'min': 1,
				'max': 8301034833169290000
			}
		});

		assert.deepEqual( slider.noUiSlider.get(), ['1', '8301034833169290000'], 'Values were accurate' );

	});

	QUnit.test( "Values, Accuracy With Large Numbers 2", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.getElementsByClassName('slider')[0];

		noUiSlider.create(slider, {
			start: [ 1, 10000000000000005 ],
			connect: true,
			format: TEST_ROUND_FORMAT,
			range: {
				'min': 1,
				'max': 10000000000000005
			}
		});

		assert.deepEqual( slider.noUiSlider.get(), ['1', '10000000000000005'], 'Values were accurate' );

	});
*/
