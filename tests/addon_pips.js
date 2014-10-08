
	function filter500( value, type ){
		return value%1000 ? 2 : 1;
	}

	function test_slider( first ){

		Q.html('\
			<div id="slider"></div>\
		');

		return Q.find("#slider").noUiSlider({
			range: {
				'min': [    (first || 0) ],
				'10%': [   500,  500 ],
				'50%': [  4000, 1000 ],
				'max': [ 10000 ]
			},
			start: 0
		})
	}

	// RANGE

	test( "Range", function(){

		var slider = test_slider();

		slider.noUiSlider_pips({
			mode: 'range',
			density: 3,
			format: wNumb({
				decimals: 2
			})
		});

		ok( Q.find('.noUi-pips'), 'Pips where created' );

		var markers = Q.find('.noUi-marker');
		ok( markers.length >= 32 && markers.length <= 34, 'Density of 1/3 was applied' );
		
		// Test formatter
		equal( Q.find('.noUi-value').first().text(), '0.00' );
	});

	test( "Steps", function(){

		var slider = test_slider();

	// STEPS

		slider.noUiSlider_pips({
			mode: 'steps',
			density: 2,
			filter: filter500
		});

		var markers = Q.find('.noUi-marker').length;
		ok( markers >= 49 && markers <= 51, 'Density of 1/2 was applied' );

	});

	test( "Positions", function(){

		var slider = test_slider();

	// POSITIONS

		slider.noUiSlider_pips({
			mode: 'positions',
			values: [0,25,50,75,100]
		});

		equal( Q.find('.noUi-marker-large').length, 5, 'Large markers added for all values' );
		equal( Q.find('.noUi-value').length, 5 );

		var pos = [];
		Q.find('.noUi-value').each(function(){
			pos.push(parseInt(this.style.left));
		});

		deepEqual(pos, [0,25,50,75,100], 'Values placed on proper positions');

	});

	test( "Positions, stepped", function(){

		expect(0); // TODO

		var slider = test_slider();

	// POSITIONS (STEPPED)

		slider.noUiSlider_pips({
			mode: 'positions',
			values: [0,25,50,75,100],
			stepped: true
		});

	});

	test( "Count", function(){

		var slider = test_slider();

	// COUNT

		slider.noUiSlider_pips({
			mode: 'count',
			values: 8
		});

		equal( Q.find('.noUi-value').length, 8, 'Placed requested number of values' );

		var pos2 = [];
		Q.find('.noUi-value').each(function(){
			pos2.push(parseInt(this.style.left));
		});

		deepEqual(pos2, [0, Math.floor((100/7)*1), Math.floor((100/7)*2), Math.floor((100/7)*3), Math.floor((100/7)*4), Math.floor((100/7)*5), Math.floor((100/7)*6), 100], 'Values spread evenly');

	});

	test( "Count, stepped", function(){

		expect(0); // TODO

		var slider = test_slider();

	// COUNT (STEPPED)

		slider.noUiSlider_pips({
			mode: 'count',
			values: 8,
			stepped: true
		});

	});

	// VALUES

	test( "Values", function(){

		// #357
		var slider = test_slider( 1 );

		slider.noUiSlider_pips({
			mode: 'values',
			values: [50, 552, 750, 940, 5000, 6080, 9000]
		});

		equal( Q.find('.noUi-value').length, 7, 'Placed requested number of values' );

	});

	// VALUES (STEPPED)

	test( "Values, stepped", function(){

		var slider = test_slider();

		slider.noUiSlider_pips({
			mode: 'values',
			values: [50, 552, 750, 940, 5000, 6080, 9000],
			stepped: true
		});

		equal( Q.find('.noUi-value').length, 6, 'Removed duplicate in step' );

	});
