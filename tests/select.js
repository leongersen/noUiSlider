
	test( "Testing select elements", function(){

		Q.html('\
			<div class="slider"></div>\
			<select id="input"></select>\
		');
		
		var input = $('#input');
		
		for( var i = -20; i <= 40; i++ ){
			input.append(
				'<option value="'+i+'">'+i+'</option>'
			);
		}

		$('.slider').noUiSlider({
			 range: {
				'min': -20,
				'max': 40
			}
			,start: [10,30]
			,connect: true
			,serialization: {
				lower: [
					new Link({
						target: input,
						format: {
							decimals: 0
						}
					})
				]
			}
		});

		input.val( 40 ).change();
		
		equal( input.val(), '30', 'Select was reset properly.' );
		
	});
