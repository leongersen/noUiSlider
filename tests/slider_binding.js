
	QUnit.test( "Binding", function( assert ){

		assert.expect(10);

		Q.innerHTML = '<div class="slider"></div>';

		var sliders = Q.getElementsByClassName('slider'),
			slider = sliders[0];

		noUiSlider.create(slider, {
			start: [ 2, 5 ],
			range: {
				'min': 0,
				'max': 10
			}
		});

		var count = 0;

		// Fires on bind, for every handle (2+2)
		slider.noUiSlider.on('update', function( values, handle ){
			assert.deepEqual(values, ['2.00', '5.00']);
			assert.ok(count++ === handle);
		});

		slider.noUiSlider.off('update');
		count = 0;

		slider.noUiSlider.on('set', function( values, handle ){
			assert.deepEqual(values, ['1.00', '6.00']);
			assert.ok(count++ === handle);
		});

		// Setting a value triggers 'set' for each handle (2+2)
		slider.noUiSlider.set([1,6]);

		slider.noUiSlider.off('set');

		// Run set again, 'set' shouldn't fire now.
		slider.noUiSlider.set([1,9]);

		count = 0;

		// Fires once on click (1)
		slider.noUiSlider.on('set.namespace', function( values, handle ){
			assert.ok(true);
		});

		// Fires once on click (1)
		slider.noUiSlider.on('change.namespace', function( values, handle ){
			assert.ok(true);
		});

		document.body.addEventListener('mousedown', function(e){
			console.log(e.clientX, e.clientY);
		});

		function offset ( el ) {
			var rect = el.getBoundingClientRect()
			return {
				top: rect.top + document.body.scrollTop,
				left: rect.left + document.body.scrollLeft
			};
		}

		var origin = slider.getElementsByClassName('noUi-origin')[1],
			clickEvent = new MouseEvent('mousedown', {
				bubbles: true,
				cancelable: true,
				view: window,
				buttons: 1,
				clientX: offset(slider).left + 100,
				clientY: offset(slider).top + 8
			});

		console.log(offset(slider));
		origin.dispatchEvent(clickEvent);

		slider.noUiSlider.off('.namespace');

		// Doesn't trigger 'set' again
		slider.noUiSlider.set([5, 7]);
	});
