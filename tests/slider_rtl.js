
	test( "RTL slider multiple value set.", function(){

		Q.html('\
			<div id="slider"></div>\
			<div id="slider2"></div>\
		');

		var slider = $("#slider").noUiSlider({
			range: {min: 0.201, max: 1},
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

		equal(slider.val(), 0.4);

		slider.val(0.201, true);
		equal(slider.val(), 0.2);

		slider.val(0.201, true);
		equal(slider.val(), 0.2);
		

		var slider2 = $("#slider2").noUiSlider({
			range: {
				'min': 0,
				'max': 50
			},
			start: [10, 40],
			behaviour: 'tap',
			connect: true,
			direction : 'rtl'
		});

		deepEqual(slider2.val(), ["10.00", "40.00"], "Proper start handling in RTL.");

		slider2.val([20,30]);
		deepEqual(slider2.val(), ["20.00", "30.00"]);

		slider2.val([40,45]);
		deepEqual(slider2.val(), ["40.00", "45.00"], "RTL slider overstepped properly.");

		slider2.val([30,35]);
		deepEqual(slider2.val(), ["30.00", "35.00"], "RTL slider understepped properly.");

	});
