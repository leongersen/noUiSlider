
	test( "Test re-append of inline elements", function(){

		Q.html('\
			<form>\
				<div class="slider"></div>\
				<input id="input-element">\
			</form>\
		');

		var slider = Q.find('.slider'), input = Q.find('#input-element');

		slider.noUiSlider({
			start: [50, 70],
			direction: 'rtl',
			range: {
				'min': [   0 ],
				'max': [ 100 ]
			}
		});

		slider.Link().to('input-lower');
		slider.Link('upper').to(input);

		equal(input.val(), '70.00');
		equal(Q.find('[name="input-lower"]').length, 1);
		equal(Q.find('[name="input-lower"]').val(), '50.00');

		slider.Link(false);
		equal(Q.find('[name="input-lower"]').length, 0, 'input was removed.');

		slider[0].destroy();

		throws(function(){
			slider.Link().to('input-throws');
		}, 'No slider to link to.');

		slider.noUiSlider({
			start: [30, 40],
			range: {
				'min': [   0 ],
				'max': [ 150 ]
			}
		});

		equal(input.val(), '70.00', 'Input didn\t change.');
		input.val(30).change();

		deepEqual(slider.val(), ['30.00', '40.00'], 'Slider didn\'t change.');

		slider.Link('lower').to('input-new');
		slider.Link('upper').to('-inline-');

		equal(Q.find('[name="input-new"]').length, 1);
		equal(Q.find('.noUi-handle > div').length, 1, 'Inline element was appended');
		equal(Q.find('.noUi-handle > div').html(), '40.00');

		slider.noUiSlider({
			start: [40, 90],
			direction: 'rtl'
		}, true);
		
		equal(Q.find('.noUi-handle > div').html(), '90.00', 'Element is still there, with new value.');

		equal(Q.find('[name="input-new"]').length, 1, 'Input was re-appended');
		equal(Q.find('[name="input-new"]').val(), '40.00', 'Value was set.');

	});
