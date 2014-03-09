
	test( "Testing input validation.", function(){

		Q.html('\
			<div class="slider"></div>\
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
			$('.slider').noUiSlider($.extend({}, {
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
			$('.slider').noUiSlider($.extend({}, {
				serialization: {
					format: {
						negative: function(){}
					}
				}
			}, settings));
		}, "Format item type.");

		throws(function(){
			$('.slider').noUiSlider($.extend({}, {
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

	});
