QUnit.test("Keyboard support", function (assert) {

    function up(element) {
        element.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowUp'}));
    }

    function down(element) {
        element.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
    }

    document.getElementById('qunit-fixture').innerHTML = '<div class="slider"></div>';

    var slider = document.getElementById('qunit-fixture').querySelector('.slider');

    noUiSlider.create(slider, {
        start: [165],
        connect: true,
        range: {
            'min': 50,
            '30%': [500, 50],
            '60%': [1000, 10],
            '90%': 1250,
            'max': 1300
        }
    });

    var handle0 = slider.querySelector('[data-handle="0"]');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '120.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '75.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '50.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '50.00');

    up(handle0);
    assert.equal(slider.noUiSlider.get(), '95.00');

    up(handle0);
    assert.equal(slider.noUiSlider.get(), '140.00');

    slider.noUiSlider.set(600);

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '550.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '500.00');

    down(handle0);
    assert.equal(slider.noUiSlider.get(), '455.00');

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
});
