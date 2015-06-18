
	function filter500( value, type ){
		return value%1000 ? 2 : 1;
	}

	function test_slider( pips, first ){

		Q.innerHTML = '<div class="slider"></div>';
		var slider = Q.getElementsByClassName('slider')[0];

		noUiSlider.create(slider, {
			range: {
				'min': [    (first || 0) ],
				'10%': [   500,  500 ],
				'50%': [  4000, 1000 ],
				'max': [ 10000 ]
			},
			start: 0,
			pips: pips
		});

		return slider;
	}

	// RANGE

	QUnit.test( "Range", function( assert ){

		var slider = test_slider({
			mode: 'range',
			density: 3,
			format: {
				to: function( value ){
					return value.toFixed(2);
				}
			}
		});

		assert.ok( Q.getElementsByClassName('noUi-pips').length, 'Pips where created' );

		var markers = Q.getElementsByClassName('noUi-marker');
		assert.ok( markers.length >= 32 && markers.length <= 34, 'Density of 1/3 was applied' );

		// Test formatter
		assert.equal( Q.getElementsByClassName('noUi-value')[0].innerHTML, '0.00' );
	});

	QUnit.test( "Steps", function( assert ){

		var slider = test_slider({
			mode: 'steps',
			density: 2,
			filter: filter500
		});

	// STEPS

		var markers = Q.getElementsByClassName('noUi-marker').length;
		assert.ok( markers >= 49 && markers <= 51, 'Density of 1/2 was applied' );

	});

	QUnit.test( "Positions", function( assert ){

		var slider = test_slider({
			mode: 'positions',
			values: [0,25,50,75,100]
		});

	// POSITIONS

		assert.equal( Q.getElementsByClassName('noUi-marker-large').length, 5, 'Large markers added for all values' );
		assert.equal( Q.getElementsByClassName('noUi-value').length, 5 );

		var pos = [];
		Array.prototype.forEach.call(Q.getElementsByClassName('noUi-value'), function( el ){
			pos.push(parseInt(el.style.left));
		});

		assert.deepEqual(pos, [0,25,50,75,100], 'Values placed on proper positions');

	});

	QUnit.test( "Positions, stepped", function( assert ){

		expect(0); // TODO

		var slider = test_slider({
			mode: 'positions',
			values: [0,25,50,75,100],
			stepped: true
		});

	// POSITIONS (STEPPED)
	});

	QUnit.test( "Count", function( assert ){

		var slider = test_slider({
			mode: 'count',
			values: 8
		});

	// COUNT

		assert.equal( Q.getElementsByClassName('noUi-value').length, 8, 'Placed requested number of values' );

		var pos2 = [];
		Array.prototype.forEach.call(Q.getElementsByClassName('noUi-value'), function( el ){
			pos2.push(parseInt(el.style.left));
		});

		assert.deepEqual(pos2, [0, Math.floor((100/7)*1), Math.floor((100/7)*2), Math.floor((100/7)*3), Math.floor((100/7)*4), Math.floor((100/7)*5), Math.floor((100/7)*6), 100], 'Values spread evenly');

	});

	QUnit.test( "Count, stepped", function( assert ){

		expect(0); // TODO

		var slider = test_slider({
			mode: 'count',
			values: 8,
			stepped: true
		});
	});

	// VALUES

	QUnit.test( "Values", function( assert ){

		// #357
		var slider = test_slider({
			mode: 'values',
			values: [50, 552, 750, 940, 5000, 6080, 9000]
		}, 1 );

		assert.equal( Q.getElementsByClassName('noUi-value').length, 7, 'Placed requested number of values' );
	});

	// VALUES (STEPPED)

	QUnit.test( "Values, stepped", function( assert ){

		var slider = test_slider({
			mode: 'values',
			values: [50, 552, 750, 940, 5000, 6080, 9000],
			stepped: true
		});

		assert.equal( Q.getElementsByClassName('noUi-value').length, 6, 'Removed duplicate in step' );
	});
