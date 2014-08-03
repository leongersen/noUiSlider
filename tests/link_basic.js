
	test( "Link implementation", function(){

		$.fn.customMethod = function(val){
			this.html(val);
		};

		Q.html('\
			<div class="slider"></div>\
			<input id="input-field">\
			<div id="div-field1"></div>\
			<div id="div-field2"></div>\
		');

		var slider = $('.slider'), input = $("#input-field"), div1 = $('#div-field1'), div2 = $('#div-field2');

		throws(function(){

			slider.Link().to('throws');

		}, 'Can\'t link before slider.');

		slider.noUiSlider({
			start: [ 0, 20 ],
			connect: true,
			step: 10,
			range: {
				'min': -30,
				'max': 30
			},
			format: TEST_ROUND_FORMAT
		});

		deepEqual(slider.val(), ['0', '20']);

		slider.Link().to(input);

		equal(input.val(), '0', 'Slider value is written to input');

		input.val(60).change();
		equal(input.val(), '20', 'Value was parsed and limited to handle max.');
		deepEqual(slider.val(), ['20', '20']);
		
		slider.val([null, 30]);
		deepEqual(slider.val(), ['20', '30']);
		
		input.val(60).change();
		equal(input.val(), '30', 'Value was parsed and limited to slider max.');

		input.val(23).change();
		input.val('Run, Forrest!').change();
		equal(input.val(), '20', 'Slider ignored invalid value and reset input.');

		slider.Link(false);
		slider.val([-20, 10])

		equal(input.val(), '20', 'Input ignored the slider');

		input.val(-20).change();
		deepEqual(slider.val(), ['-20', '10'], 'Input didn\t affect slider.');

		slider.Link('upper').to(div1, 'customMethod');

		equal(div1.html(), '10', 'HTML was set');

		slider.Link('upper').to(div2, function( value, handle, sliderInstance ){

			equal(value, 10, "Value as expected.");

			ok(handle.hasClass("noUi-handle"), "Handle is a handle.");
			ok(sliderInstance.hasClass("noUi-target"), "Slider is a slider.");
			ok(div2[0] === this[0], "Element is scope of call and $.");
			ok(slider[0] === sliderInstance[0], "Slider argument is slider.");

			$(this).Link(false);
		});

		equal(div2.html(), '', 'Element wasn\t altered.');

		slider.Link().to(function( value, handle, sliderInstance ){

			equal(value, -20, "Value as expected.");

			ok(handle.hasClass("noUi-handle-lower"), "Handle is a handle.");
			ok(sliderInstance.hasClass("noUi-target"), "Slider is a slider.");
			ok(sliderInstance[0] === this[0], "Slider is scope of call and $.");

			$(this).Link(false);
		});
	});
