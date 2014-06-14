
	test( "Generation of legends", function(){

		Q.html('\
			<div id="slider1"></div>\
			<div id="slider2"></div>\
		');

		function filter500( value, type ){
			return value%1000 ? 2 : 1;
		}

		var slider2 = $("#slider2").noUiSlider({
			range: {
				'min': [     0 ],
				'10%': [   500,  500 ],
				'50%': [  4000, 1000 ],
				'max': [ 10000 ]
			},
			start: 0
		})

	// RANGE
		
		slider2.noUiSlider('legend', {
			mode: 'range',
			density: 3
		});

		ok( slider2.next().hasClass('noUi-legend'), 'Legend was created' );

		var markers = slider2.next().children('.noUi-marker').length;
		ok( markers >= 32 && markers <= 34, 'Density of 1/3 was applied' );

	// STEPS
		
		slider2.noUiSlider('legend', {
			mode: 'steps',
			density: 2,
			filter: filter500
		});

		var markers = slider2.next().children('.noUi-marker').length;
		ok( markers >= 49 && markers <= 51, 'Density of 1/2 was applied' );

	// POSITIONS

		slider2.noUiSlider('legend', {
			mode: 'positions',
			values: [0,25,50,75,100]
		});

		equal( slider2.next().children('.noUi-marker-large').length, 5, 'Large markers added for all values' );
		equal( slider2.next().children('.noUi-value').length, 5 );
		
		var pos = [];
		slider2.next().children('.noUi-value').each(function(){
			pos.push(parseInt(this.style.left));
		});
		
		deepEqual(pos, [0,25,50,75,100], 'Values placed on proper positions');

	// POSITIONS (STEPPED)
		
		slider2.noUiSlider('legend', {
			mode: 'positions',
			values: [0,25,50,75,100],
			stepped: true
		});
		
		// todo

	// COUNT
		
		slider2.noUiSlider('legend', {
			mode: 'count',
			values: 8
		});

		equal( slider2.next().children('.noUi-value').length, 8, 'Placed requested number of values' );
		
		var pos2 = [];
		slider2.next().children('.noUi-value').each(function(){
			pos2.push(parseInt(this.style.left));
		});
		
		deepEqual(pos2, [0, Math.floor((100/7)*1), Math.floor((100/7)*2), Math.floor((100/7)*3), Math.floor((100/7)*4), Math.floor((100/7)*5), Math.floor((100/7)*6), 100], 'Values spread evenly');

	// COUNT (STEPPED)
		
		slider2.noUiSlider('legend', {
			mode: 'count',
			values: 8,
			stepped: true
		});
		
		// todo

	// VALUES
		
		slider2.noUiSlider('legend', {
			mode: 'values',
			values: [50, 552, 750, 940, 5000, 6080, 9000]
		});
		
		equal( slider2.next().children('.noUi-value').length, 7, 'Placed requested number of values' );

	// VALUES (STEPPED)
		
		slider2.noUiSlider('legend', {
			mode: 'values',
			values: [50, 552, 750, 940, 5000, 6080, 9000],
			stepped: true
		});

		equal( slider2.next().children('.noUi-value').length, 6, 'Removed duplicate in step' );

	});
