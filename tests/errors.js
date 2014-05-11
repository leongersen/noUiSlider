
	test( "Testing input validation.", function(){

		Q.html('\
			<div class="slider1"></div>\
			<div class="slider2"></div>\
			<div class="slider3"></div>\
			<div class="slider4"></div>\
		');

		var settings = {
			start: [10,30],
			connect: true,
			range: {
				'min': -20,
				'max': 40
			}
		};

		throws(function(){
			$('.slider1').noUiSlider($.extend({}, {
				serialization: {
					lower: [
						new Link({
							target: input,
							format: {
								decimals: 8
							}
						})
					]
				}
			}, settings));
		}, "Decimal count.");

		throws(function(){
			$('.slider2').noUiSlider($.extend({}, {
				serialization: {
					format: {
						negative: function(){}
					}
				}
			}, settings));
		}, "Format item type.");

		throws(function(){
			$('.slider3').noUiSlider($.extend({}, {
				serialization: {
					lower: [
						new Link({
							target: function(){},
							format: {
								mark: ','
							}
						})
					],
					format: {
						thousand: ','
					}
				}
			}, settings));
		}, "Incompatible equal formatting options.");

		throws(function(){
			$('.slider4').noUiSlider({
				range: { },
				start: [20, 30]
			});
		}, "Missing 'min' or 'max' in range.");
	});
