	function simulateMousedown(clickTarget, x, y) {
		// Based on https://stackoverflow.com/a/19570419/1367431
		var clickEvent= document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(
			'mousedown', true, true, window, 0,
			0, 0, x, y, false, false,
			false, false, 0, null
		);
		clickTarget.dispatchEvent(clickEvent);
	}

	QUnit.test( "Slider with contained handles", function( assert ){

		Q.innerHTML = '\
			<div id="slider1" class="contained-handles"></div>\
			<style>\
				.noUi-target {\
				    padding: 0 16px;\
				}\
				.noUi-base:before {\
					content: "";\
					width: calc(100% + 34px);\
					height: 100%;\
					position: absolute;\
					top: 0;\
					left: -17px;\
					display: block;\
					background: red;\
				}\
			</style>\
		';

		var slider = document.getElementById('slider1');

		noUiSlider.create(slider, {
			start: 50,
			connect: [true, false],
			range: {
				'min': 0,
				'max': 100
			},
			animate: false,
			animationDuration: 0
		});

		// Click the leftmost edge of the bar
		var rect = slider.getBoundingClientRect(),
			base = slider.querySelector('.noUi-base'),
			midY = rect.y + rect.height / 2;

		// These clicks aren't on .noUi-base itself but rather its child pseudo-elements.
		// The "contained handles" style relies on clickable pseudo-elements. If the click is 
		// outside the bounds of .noUi-base, it should snap to the end (0% or 100%).

		// Click on leftmost edge of slider. 
		simulateMousedown(base, rect.x + 1, midY);
		assert.strictEqual(slider.noUiSlider.get(), '0.00', 'Click near left edge should update value to 0');

		// Click on rightmost edge of slider
		simulateMousedown(base, rect.x + rect.width - 1, midY);
		assert.strictEqual(slider.noUiSlider.get(), '100.00', 'Click near right edge should update value to 100');

		// Click leftmost edge again
		simulateMousedown(base, rect.x + 1, midY);
		assert.strictEqual(slider.noUiSlider.get(), '0.00', 'Click near left edge should update value to 0');

	});
