
	test( "Generation of named inputs", function(){

		Q.html('\
			<form>\
				<div class="slider" id="slidera"></div>\
				<div class="slider" id="sliderb"></div>\
				<div class="slider" id="sliderc"></div>\
			</form>\
		');

		Q.find(".slider").noUiSlider({
			  range: {
				'min': [   0 ],
				'max': [ 100 ]
			}
			,start: [ 20, 80 ]
			,serialization: {
				 lower: [
					new Link({
						target: 'lower'
					})
				]
				,upper: [
					new Link({
						target: 'upper'
					})
				]
			}
		});

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

	});
