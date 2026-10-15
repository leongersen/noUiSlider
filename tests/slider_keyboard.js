QUnit.test("Keyboard support", function (assert) {

    function up(element) {
        element.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowUp'}));
    }

    function down(element) {
        element.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
    }

    function pageUp(element) {
        element.dispatchEvent(new KeyboardEvent('keydown', {'key': 'PageUp'}));
    }

    function pageDown(element) {
        element.dispatchEvent(new KeyboardEvent('keydown', {'key': 'PageDown'}));
    }

    document.getElementById('qunit-fixture').innerHTML = '<div class="slider"></div>';

    var slider = document.getElementById('qunit-fixture').querySelector('.slider');

    noUiSlider.create(slider, {
        start: [165],
        connect: true,
        range: {
            'min': 50,
            '10%': 100,
            '30%': [500, 50],
            '60%': [1000, 10],
            '90%': 1250,
            'max': 1300
        }
    });

    var handle0 = slider.querySelector('[data-handle="0"]');

    assert.equal(slider.noUiSlider.get(), '165.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '125.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '85.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '80.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '75.00');

    up(handle0);
    assert.equal(slider.noUiSlider.get(), '80.00');

    up(handle0);
    assert.equal(slider.noUiSlider.get(), '85.00');

    slider.noUiSlider.set(600);

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '550.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '500.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '460.00');

    slider.noUiSlider.set(1000);

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '950.00');

    up(handle0);
    assert.equal(slider.noUiSlider.get(), '1000.00');

    up(handle0);
    assert.equal(slider.noUiSlider.get(), '1010.00');

    slider.noUiSlider.set(1230);

    up(handle0);
    assert.equal(slider.noUiSlider.get(), '1240.00');

    up(handle0);
    assert.equal(slider.noUiSlider.get(), '1250.00');

    up(handle0);
    assert.equal(slider.noUiSlider.get(), '1255.00');

    slider.noUiSlider.set(55);

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '50.00');

    slider.noUiSlider.destroy();

    noUiSlider.create(slider, {
        start: [1, 6],
        step: 3,
        range: {
            'min': 0,
            'max': 10
        }
    });

    assert.deepEqual(slider.noUiSlider.get(), ['0.00', '6.00']);

    handle0 = slider.querySelector('[data-handle="0"]');

    up(handle0);
    assert.deepEqual(slider.noUiSlider.get(), ['3.00', '6.00']);

    up(handle0);
    assert.deepEqual(slider.noUiSlider.get(), ['6.00', '6.00']);

    up(handle0);
    assert.deepEqual(slider.noUiSlider.get(), ['6.00', '6.00'], 'Handle 0 cannot push past handle 1');

    slider.noUiSlider.destroy();

    noUiSlider.create(slider, {
        start: [5],
        step: 1,
        range: {
            'min': 0,
            'max': 10
        },
        keyboardPageMultiplier: 2
    });

    assert.deepEqual(slider.noUiSlider.get(), '5.00');

    handle0 = slider.querySelector('[data-handle="0"]');

    pageDown(handle0);
    assert.deepEqual(slider.noUiSlider.get(), '3.00');

    pageUp(handle0);
    assert.deepEqual(slider.noUiSlider.get(), '5.00');
});

QUnit.test("Fixed handles move together with the keyboard", function (assert) {
    ['horizontal', 'vertical'].forEach(function (orientation) {
        ['ltr', 'rtl'].forEach(function (direction) {
            document.getElementById('qunit-fixture').innerHTML = '<div class="slider"></div>';
            var slider = document.getElementById('qunit-fixture').querySelector('.slider');
            noUiSlider.create(slider, {
                start: [20, 40], connect: true, step: 5,
                behaviour: 'drag-fixed', orientation: orientation, direction: direction,
                padding: 10, range: { min: 0, max: 100 }
            });
            var handles = slider.querySelectorAll('.noUi-handle');
            function key(index, name) {
                handles[index].dispatchEvent(new KeyboardEvent('keydown', { key: name }));
            }
            var increase = orientation === 'horizontal' ?
                (direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft') :
                (direction === 'ltr' ? 'ArrowDown' : 'ArrowUp');
            key(0, increase);
            assert.deepEqual(slider.noUiSlider.get(true), [25, 45], 'first handle moves pair');
            key(1, increase);
            assert.deepEqual(slider.noUiSlider.get(true), [30, 50], 'second handle moves pair');
            key(0, 'Home');
            assert.deepEqual(slider.noUiSlider.get(true), [10, 30], 'Home respects padding');
            key(1, 'End');
            assert.deepEqual(slider.noUiSlider.get(true), [70, 90], 'End respects padding');
            key(0, increase);
            assert.deepEqual(slider.noUiSlider.get(true), [70, 90], 'pair stops at boundary');
            key(0, 'Home');
            var pageIncrease = orientation === 'vertical' && direction === 'ltr' ? 'PageDown' : 'PageUp';
            key(1, pageIncrease);
            assert.deepEqual(slider.noUiSlider.get(true), [35, 55], 'page multiplier moves pair');
            slider.noUiSlider.disable(0);
            key(1, increase);
            assert.deepEqual(slider.noUiSlider.get(true), [35, 55], 'disabled partner blocks pair');
            slider.noUiSlider.enable(0);
            slider.noUiSlider.disable();
            key(0, increase);
            assert.deepEqual(slider.noUiSlider.get(true), [35, 55], 'disabled slider blocks pair');
            slider.noUiSlider.enable();
            slider.noUiSlider.updateOptions({ range: { min: 0, max: 200 }, start: [60, 80] });
            key(0, increase);
            assert.deepEqual(slider.noUiSlider.get(true), [65, 85], 'updated slider still moves pair');
            slider.noUiSlider.destroy();
        });
    });
});

QUnit.test("Fixed keyboard movement notifies both handles", function (assert) {
    document.getElementById('qunit-fixture').innerHTML = '<div class="slider"></div>';
    var slider = document.getElementById('qunit-fixture').querySelector('.slider');
    noUiSlider.create(slider, {
        start: [20, 40], connect: true, step: 5, behaviour: 'drag-fixed',
        range: { min: 0, max: 100 }
    });
    var events = [];
    ['update', 'slide', 'change', 'set', 'drag'].forEach(function (name) {
        slider.noUiSlider.on(name, function (values, handle) { events.push(name + ':' + handle); });
    });
    events = [];
    slider.querySelector('.noUi-handle').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    assert.deepEqual(events.sort(), ['change:0', 'change:1', 'set:0', 'set:1', 'slide:0', 'slide:1', 'update:0', 'update:1']);
    slider.noUiSlider.destroy();
});
