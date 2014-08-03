
	test( "Testing select elements", function(){

		Q.html('\
			<div class="slider"></div>\
			<select id="select"></select>\
		');

		var select = $('#select');

		for( var i = -20; i <= 40; i++ ){
			select.append(
				'<option value="'+i+'">'+i+'</option>'
			);
		}

		$('.slider').noUiSlider({
			start: [ 10, 30 ],
			connect: true,
			range: {
				'min': -20,
				'max': 40
			}
		});

		$('.slider').Link('lower').to(select, null, TEST_ROUND_FORMAT);

		select.val( 40 ).change();

		equal( select.val(), '30', 'Select was reset properly.' );

	});
