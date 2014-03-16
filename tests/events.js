
	test( "Triggering events", function(){

		Q.html('\
			<div class="slider"></div>\
		');

		var slider = $('.slider');

		slider.noUiSlider({
			start: [ 30, 40 ],
			connect: true,
			range: {
				'min': [ 50 ],
				'max': [ 90 ]
			},
			serialization: {
				format: {
					decimals: 0,
					postfix: ',-'
				}
			}
		});

		var w = slider.width();

		var handles = slider.find('.noUi-handle');

		slider.on("slide", function( event, values ){
			deepEqual( values, ['50,-', '70,-'], "Slide event has proper parameters." );
		});

		handles.first().trigger($.Event('mousedown', {
			clientX: 10,
			clientY: 0
		}));

		$(document).trigger($.Event('mousemove', {
			clientX: 52,
			clientY: 0
		}));

		$(document).trigger('mouseup');

		deepEqual( slider.val(), ['50,-', '50,-'], "Slider didn't cross." );

		handles.last().trigger($.Event('mousedown', {
			clientX: 10,
			clientY: 0
		}));

		$(document).trigger($.Event('mousemove', {
			clientX: 130,
			clientY: 0
		}));

		$(document).trigger('mouseup');

		deepEqual( slider.val(), ['50,-', '70,-'], "Slider moved properly." );

	});
