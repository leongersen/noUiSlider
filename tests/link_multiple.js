
	test( "Generation of named inputs", function(){

		Q.html('\
			<form>\
				<div class="slider" id="slidera"></div>\
				<div class="slider" id="sliderb"></div>\
				<div class="slider" id="sliderc"></div>\
			</form>\
		');

		Q.find('.slider').noUiSlider({
			start: [ 20, 80 ],
			range: {
				'min': [   0 ],
				'max': [ 100 ]
			}
		});

		Q.find('.slider').Link('lower').to('input-lower');
		Q.find('.slider').Link('upper').to('input-upper');

		$("#slidera").val([50, 61]);
		$("#sliderb").val([51, 62]);
		$("#sliderc").val([52, 63]);

		var inputs = Q.find('input');

		equal( inputs.length, 6, "Generated all inputs" );

		equal( $(inputs[0]).val(), '50.00' );
		equal( $(inputs[1]).val(), '61.00' );
		equal( $(inputs[2]).val(), '51.00' );
		equal( $(inputs[3]).val(), '62.00' );
		equal( $(inputs[4]).val(), '52.00' );
		equal( $(inputs[5]).val(), '63.00' );

		equal(Q.find('[name="input-lower"]').length, 3);
		
	});
