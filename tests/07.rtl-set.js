
	test( "RTL slider multiple value set.", function(){

		Q.html('\
			<form>\
				<div class="slider" id="slider"></div>\
				<span id="min">0</span>\
			</form>\
		');

		var slider = $("#slider").noUiSlider({
			range: {min: 0.201, max: 1},
			step: 0.01,
			start: [0.401],
			direction: "rtl",
			orientation: "vertical"
		});

		slider.Link('lower', {
			target: $("#min")
		});

		equal(slider.val(), 0.4);

		slider.val(0.201, true);
		equal(slider.val(), 0.2);

		slider.val(0.201, true);
		equal(slider.val(), 0.2);
	});
