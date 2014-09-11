
	test( "Test rtl link integration", function(){

		Q.html('\
			<form>\
				<div id="slider"></div>\
				<input id="write">\
			</form>\
		');

		var slider = Q.find('#slider'), input = Q.find('#write');

		slider.noUiSlider({
			range: { min: 0, max: 15 },
			direction: 'rtl',
			orientation: 'vertical',
			start: 5
		}).Link('lower').to(input);

		equal(input.val(), '5.00');

		input.val('8').change();

		equal(input.val(), '8.00');
	});
