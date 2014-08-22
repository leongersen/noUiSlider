
	test( "Limit option", function(){

		Q.html('\
			<div class="slider"></div>\
		');

		var slider = Q.find('.slider');

		slider.noUiSlider({
			start: [ 50, 100 ],
			limit: 30,
			range: {
				'min': 30,
				'max': 986
			}
		});

		deepEqual( slider.val(), ['50.00', '80.00'], 'Limit applied on init.' );

		slider.val( [ null, 600 ] );
		deepEqual( slider.val(), ['50.00', '80.00'], 'Handle can\'t leave limit.' );
		
		slider.val( [ 150, 600 ] );
		deepEqual( slider.val(), ['150.00', '180.00'], 'Multiple set limit.' );

		slider.noUiSlider({ direction: 'rtl' }, true);
		
		deepEqual( slider.val(), ['150.00', '180.00'], 'Re-init rtl keeps value.' );

		slider.val( [ 120, 240 ] );
		deepEqual( slider.val(), ['120.00', '150.00'], 'RTL set.' );
	});
