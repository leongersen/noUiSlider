
	QUnit.test( "Margin divisible by step", function( assert ){

		expect(0);
	
		Q.innerHTML = '<div class="slider"></div>';

		var settings = {
			start: 10,
			margin: 5,
			step: 0.2,
			range: {
				'min': 1,
				'max': 100
			}
		};

		var slider = Q.querySelector('.slider');

		// Should not throw on divisibility
		noUiSlider.create(slider, settings);
	});
