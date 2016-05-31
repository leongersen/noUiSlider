
	QUnit.test( "Slider with three or more handles", function( assert ){

		Q.innerHTML = '\
			<div id="slider1"></div>\
			<div id="slider2" style="position: fixed; left: 10px; top: 10px;" ></div>\
		';

		var slider = document.getElementById('slider1');

		noUiSlider.create(slider, {
			start: [ 5, 10, 15 ],
			range: {
				'min': [0, 1],
				'max': [20]
			}
		});

		assert.deepEqual(slider.noUiSlider.get().map(Number), [5, 10, 15]);

		slider.noUiSlider.set([0, 0, 1]);
		assert.deepEqual(slider.noUiSlider.get().map(Number), [0, 0, 1]);

		slider.noUiSlider.set([19, 20, 20]);
		assert.deepEqual(slider.noUiSlider.get().map(Number), [19, 20, 20]);



		// xnakos spotted a bug where handles can stack wrong, so if there are
		// two handles in the same place, one movable and one not, sometimes
		// when you try to drag you get the non-movable one so they get stuck.
		// See https://github.com/michaeltandy/noUiSlider/pull/3

		// requestAnimationFrame is used for efficient painting but it breaks 
		// this test as the handles don't get moved. Temporarily disable it.
                var oldRAF = window.requestAnimationFrame;
		window.requestAnimationFrame = false;

		var slider2 = document.getElementById('slider2');
		noUiSlider.create(slider2, {
			start: [ 10, 20, 20 ],
			range: {
				'min': [0, 1],
				'max': [20]
			}
		});

		var handles2 = slider2.querySelectorAll('.noUi-handle'),
			leftmostHandle = handles2[0],
			middleHandle = handles2[1],
			rightmostHandle = handles2[2],
			middleHandlePos = middleHandle.getBoundingClientRect();

		assert.deepEqual(middleHandlePos, rightmostHandle.getBoundingClientRect(), "Two handles in the same location should have the same on-screen position");
		assert.notDeepEqual(middleHandlePos, leftmostHandle.getBoundingClientRect(), "Handles at different ends of the slider should have different positions. This might mean requestAnimationFrame is waiting for a repaint before moving the handles, or the box you're drawing into is off screen.");

		var x = (middleHandlePos.right+middleHandlePos.left)/2,
			y = (middleHandlePos.top+middleHandlePos.bottom)/2,
			selectedByClick = document.elementFromPoint(x, y);
		assert.strictEqual(selectedByClick, middleHandle, "Middle handle should be selected by click as rightmost handle is unmovable move")

		window.requestAnimationFrame = oldRAF;
	});
