// A browser dispatches one touch event per touched element. In Chrome, 'changedTouches' of each of these
// events lists every touch that changed, also the touches on other elements.
function simulateMoveOfAllTouches(touches) {
    touches.forEach(function (touch) {
        simulateTouch('touchmove', touch.target, touches, touches);
    });
}

function createTouchTestSlider(id, top, start) {
    var slider = document.createElement('div');
    slider.id = id;
    slider.style.cssText = 'position: fixed; left: 10px; top: ' + top + 'px;';
    document.getElementById('qunit-fixture').appendChild(slider);

    // The slider is 300px wide: 3px for each unit.
    noUiSlider.create(slider, {
        start: start,
        step: 1,
        range: {
            'min': 0,
            'max': 100
        },
        animate: false
    });

    return slider;
}

QUnit.test("Multi-touch: two sliders, both touches move in the same event", function (assert) {

    document.getElementById('qunit-fixture').innerHTML = '';

    var slider1 = createTouchTestSlider('slider1', 10, 50);
    var slider2 = createTouchTestSlider('slider2', 60, 50);
    var area1 = slider1.querySelector('.noUi-touch-area');
    var area2 = slider2.querySelector('.noUi-touch-area');

    simulateTouch('touchstart', area1, [createTouch(1, area1, 160, 20)], [createTouch(1, area1, 160, 20)]);
    simulateTouch('touchstart', area2, [createTouch(2, area2, 160, 70)], [createTouch(1, area1, 160, 20), createTouch(2, area2, 160, 70)]);

    // Touch 1 moves 30px to the right, touch 2 moves 30px to the left.
    simulateMoveOfAllTouches([createTouch(1, area1, 190, 20), createTouch(2, area2, 130, 70)]);

    assert.equal(slider1.noUiSlider.get(), '60.00', 'Slider 1 follows touch 1');
    assert.equal(slider2.noUiSlider.get(), '40.00', 'Slider 2 follows touch 2');

    simulateTouch('touchend', area1, [createTouch(1, area1, 190, 20)], []);
    simulateTouch('touchend', area2, [createTouch(2, area2, 130, 70)], []);
});

QUnit.test("Multi-touch: two handles of one slider, both touches move in the same event", function (assert) {

    document.getElementById('qunit-fixture').innerHTML = '';

    var slider = createTouchTestSlider('slider1', 10, [20, 80]);
    var areas = slider.querySelectorAll('.noUi-touch-area');

    simulateTouch('touchstart', areas[0], [createTouch(1, areas[0], 70, 20)], [createTouch(1, areas[0], 70, 20)]);
    simulateTouch('touchstart', areas[1], [createTouch(2, areas[1], 250, 20)], [createTouch(1, areas[0], 70, 20), createTouch(2, areas[1], 250, 20)]);

    // Touch 1 moves 30px to the right, touch 2 moves 30px to the left.
    simulateMoveOfAllTouches([createTouch(1, areas[0], 100, 20), createTouch(2, areas[1], 220, 20)]);

    assert.deepEqual(slider.noUiSlider.get(), ['30.00', '70.00'], 'Each handle follows its own touch');

    simulateTouch('touchend', areas[0], [createTouch(1, areas[0], 100, 20)], []);
    simulateTouch('touchend', areas[1], [createTouch(2, areas[1], 220, 20)], []);
});

QUnit.test("Multi-touch: a touch outside the slider moves in the same event", function (assert) {

    document.getElementById('qunit-fixture').innerHTML = '';

    var slider = createTouchTestSlider('slider1', 10, 50);
    var area = slider.querySelector('.noUi-touch-area');
    var outside = document.body;

    // Touch 1 is not on a slider, for instance a thumb resting on the screen.
    simulateTouch('touchstart', outside, [createTouch(1, outside, 40, 200)], [createTouch(1, outside, 40, 200)]);
    simulateTouch('touchstart', area, [createTouch(2, area, 160, 20)], [createTouch(1, outside, 40, 200), createTouch(2, area, 160, 20)]);

    // Touch 1 moves 3px, touch 2 moves 30px to the left.
    simulateMoveOfAllTouches([createTouch(1, outside, 43, 200), createTouch(2, area, 130, 20)]);

    assert.equal(slider.noUiSlider.get(), '40.00', 'The slider follows the touch on its handle');

    simulateTouch('touchend', outside, [createTouch(1, outside, 43, 200)], [createTouch(2, area, 130, 20)]);
    simulateTouch('touchend', area, [createTouch(2, area, 130, 20)], []);
});

QUnit.test("Multi-touch: touchstart on the handle element while another touch is on the page", function (assert) {

    document.getElementById('qunit-fixture').innerHTML = '';

    var slider = createTouchTestSlider('slider1', 10, 50);
    // The handle itself is the event target when the touch lands on one of its pseudo-elements.
    var handle = slider.querySelector('.noUi-handle');
    var outside = document.body;

    simulateTouch('touchstart', outside, [createTouch(1, outside, 40, 200)], [createTouch(1, outside, 40, 200)]);
    simulateTouch('touchstart', handle, [createTouch(2, handle, 160, 20)], [createTouch(1, outside, 40, 200), createTouch(2, handle, 160, 20)]);
    simulateTouch('touchmove', handle, [createTouch(2, handle, 130, 20)], [createTouch(1, outside, 40, 200), createTouch(2, handle, 130, 20)]);

    assert.equal(slider.noUiSlider.get(), '40.00', 'The second touch moves the handle');

    simulateTouch('touchend', handle, [createTouch(2, handle, 130, 20)], [createTouch(1, outside, 40, 200)]);
});

QUnit.test("Touch on a slider in a shadow root (#1121)", function (assert) {

    document.getElementById('qunit-fixture').innerHTML = '<div id="host" style="position: fixed; left: 10px; top: 10px;"></div>';

    var host = document.getElementById('host');
    var root = host.attachShadow({mode: 'open'});
    root.innerHTML = '<div id="slider1" style="width: 300px;"></div>';
    var slider = root.getElementById('slider1');

    noUiSlider.create(slider, {
        start: 50,
        step: 1,
        range: {
            'min': 0,
            'max': 100
        },
        animate: false
    });

    var area = slider.querySelector('.noUi-touch-area');
    var outside = document.body;

    // Listeners outside the shadow root see the host as the target of a touch that started inside it.
    simulateTouch('touchstart', area, [createTouch(1, area, 160, 20)], [createTouch(1, area, 160, 20)]);
    simulateTouch('touchmove', area, [createTouch(1, host, 190, 20)], [createTouch(1, host, 190, 20)]);

    assert.equal(slider.noUiSlider.get(), '60.00', 'A single touch moves the handle');

    // A second touch outside the shadow root starts, and both touches move in the same event.
    simulateTouch('touchstart', outside, [createTouch(2, outside, 40, 200)], [createTouch(1, host, 190, 20), createTouch(2, outside, 40, 200)]);
    simulateTouch('touchmove', area, [createTouch(2, outside, 43, 200), createTouch(1, host, 220, 20)], [createTouch(1, host, 220, 20), createTouch(2, outside, 43, 200)]);

    assert.equal(slider.noUiSlider.get(), '70.00', 'The handle follows its own touch');

    simulateTouch('touchend', area, [createTouch(1, host, 220, 20)], [createTouch(2, outside, 43, 200)]);
});
