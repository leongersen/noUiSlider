
	test( "No slider", function(){

		Q.html('');

		var slider = Q.find('.slider'), is = slider.noUiSlider({
			range: { min: 0, max: 20 },
			start: [ 12 ],
		});

		equal(is, slider);
	});
