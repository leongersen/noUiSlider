
	QUnit.test( "RTL slider multiple value set.", function( assert ){

		Q.innerHTML = '<div class="slider"></div>';

		var slider = Q.querySelector('.slider');

		noUiSlider.create(slider, {
			range: { min: 0.201, max: 1 },
			step: 0.01,
			start: 0.401,
			direction: "rtl",
			orientation: "vertical",
			format: {
				to: function(x){
					return x.toFixed(1);
				},
				from: Number
			}
		});

		equal(slider.noUiSlider.get(), 0.4);

		slider.noUiSlider.set(0.201);
		equal(slider.noUiSlider.get(), 0.2);

		slider.noUiSlider.set(0.201);
		equal(slider.noUiSlider.get(), 0.2);
	});
