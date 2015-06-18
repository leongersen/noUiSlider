
	test( "Serialization and formatting options", function(){

		Q.html('\
			<div class="slider" id="slider"></div>\
			<input id="inputChange">\
			<input id="inputVal">\
			<span id="sliderspan"></span>\
		');

		$("#slider").noUiSlider({
			start: [ 0, 0.002 ],
			connect: true,
			behaviour: 'drag',
			range: {
				'min': [ 0.001 ],
				'max': [ 0.003 ]
			},
			format: wNumb({
				decimals: 5
			})
		});

		$("#slider").Link('lower').to('-inline-<div class="tooltip"/>', function( value, handle, slider ){
			ok( $("#slider")[0] === slider[0] );
			ok( handle.hasClass('noUi-handle') );
		}, wNumb({
			decimals: 6,
			prefix: '#',
			negativeBefore: '!',
			negative: ''
		}));

		$("#slider").Link('lower').to($("#inputChange"), null, wNumb({
			mark: '.',
			thousand: ',',
			prefix: '$',
			postfix: ' p.p.',
			decimals: 3,
			negativeBefore: '-',
			negative: '',
			encoder: function( a ){
				return a * 1E7;
			},
			decoder: function( a ){
				return a / 1E7;
			}
		}));
		
		$("#slider").Link('upper').to($("#inputVal"), 'val');

		$("#inputChange").val( "15000" ).trigger('change');

		equal( $("#inputChange").val(), "$15,000.000 p.p.", "Testing interpretation of improper data" );

		$("#inputVal").val( 3 );

		equal( $("#inputVal").val(), "3" );

		$("#inputVal").trigger("change");

		equal ( $("#inputVal").val(), "3", "Input doesn't respond to change events." );

		deepEqual( $("#slider").val(), ["0.00150", "0.00200"] );

	});
