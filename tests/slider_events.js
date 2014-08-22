
	test( "Triggering events", function(){

		Q.html('<div class="slider"></div>');

		var slider = Q.find('.slider');

		slider.width(302); // Border of 2 pixels

		slider.noUiSlider({
			start: [ 0, 100 ],
			connect: true,
			range: {
				'min': [ 0 ],
				'max': [ 300 ]
			}
		});

		equal(slider.find('.noUi-base').length, 1);
		equal(slider.find('.noUi-base').width(), 300, 'Testable width')

		var handles = slider.find('.noUi-handle');

		ok( !slider.hasClass('noUi-state-tap'), 'No transition on value set' );

		slider.on('slide', function( event, values ){
			deepEqual( values, ['30.00', '100.00'], "Slide event has proper parameters." );
			slider.off('slide')
		});

		handles.first().trigger($.Event('mousedown', {
			clientX: 10,
			clientY: 0
		}));

		$(document).trigger($.Event('mousemove', {
			clientX: 40,
			clientY: 0
		}));

		$(document).trigger('mouseup');




		slider.on('set', function( event, values ){
			deepEqual( values, ['30.00', '249.00']);
			slider.off('set')
		});

		handles.last().trigger($.Event('mousedown', {
			clientX: 50,
			clientY: 0
		}));

		$(document).trigger($.Event('mousemove', {
			clientX: 100,
			clientY: 0
		}));
		
		equal(handles.last().parent()[0].style.left, '50%', 'Proper half-way left offset.');

		$(document).trigger($.Event('mousemove', {
			clientX: 199,
			clientY: 0
		}));

		$(document).trigger('mouseup');

		deepEqual(slider.val(), ['30.00', '249.00'], 'Value has changed.');


		slider.val([10, 20]);

		ok( slider.hasClass('noUi-state-tap'), 'Animating class has been applied.' );


		QUnit.asyncTest( "Testing after animation", function(){

			setTimeout(function() {

				QUnit.start();

				ok( !slider.hasClass('noUi-state-tap'), 'Animation class is removed properly.' );

				slider.on('change', function( event, values ){
					deepEqual( values, ['10.00', '10.00'], "Slide event has proper parameters." );
					slider.off('slide')
				});

				deepEqual( slider.val(), ['10.00', '20.00'] );

				handles.last().trigger($.Event('mousedown', {
					clientX: 1000,
					clientY: 0
				}));

				$(document).trigger($.Event('mousemove', {
					clientX: 980,
					clientY: 0
				}));

				$(document).trigger('mouseup');

				deepEqual( slider.val(), ['10.00', '10.00'], "Slider didn't cross." );

			}, 350);
		});
	});
