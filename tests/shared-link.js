
	test( "Shared link element", function(){

		Q.html('\
			<div class="slider" id="slidera"></div>\
			<div class="slider" id="sliderb"></div>\
			<span id="slider-span"></span>\
		');

		var span = $('#slider-span');

		$("#slidera, #sliderb").noUiSlider({
			 range: {
				'min': [ -20 ],
				'max': [  20 ]
			}
			,start: [ 0, 10 ]
			,behaviour: 'drag'
			,connect: true
			,serialization: {
				lower: [

					new Link({
						target: span,
						format: {
							 mark: ','
							,decimals: 1
							,thousand: '.'
							,encoder: function( decoded ){
								return decoded * 10000;
							}
							,decoder: function( encoded ){
								return encoded / 10000;
							}
						}
					})

				]
			}
		});

		$("#sliderb").val( 1 );

		deepEqual( $("#slidera").val(), ['0.00', '10.00'] );
		equal( span.html(), '10.000,0' );

	});
