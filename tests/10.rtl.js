
	test( "RTL value method", function(){

		Q.html('\
			<form>\
				<div class="slider" id="slider"></div>\
				<span id="max">0</span>\
				<span id="min">0</span>\
			</form>\
		');

		var slider = $("#slider").noUiSlider({
			range: {
				'min': 0,
				'max': 50
			},
			start: [10, 40],
			behaviour: 'tap',
			connect: true,
			direction : 'rtl',
			format: {
				to: function( a ){
					return a.toFixed(2);
				},
				from: Number
			}
		});

		slider.Link('lower', {
			target: $("#min")
		});
		slider.Link('upper', {
			target: $("#max")
		});

		deepEqual(slider.val(), ["10.00", "40.00"], "Proper start handling in RTL.");

		slider.val([20,30]);
		deepEqual(slider.val(), ["20.00", "30.00"]);

		slider.val([40,45]);
		deepEqual(slider.val(), ["40.00", "45.00"], "RTL slider overstepped properly.");

		slider.val([30,35]);
		deepEqual(slider.val(), ["30.00", "35.00"], "RTL slider understepped properly.");

	});
