
	test( "Testing Links", function(){

		Q.html('\
			<div class="slider"></div>\
			<div class="box"></div>\
			<div class="thing"></div>\
			<div class="item"></div>\
		');

		$.fn.cake = function(val){
			this.html(val);
		};

		var val1 = 0,
			val2 = 0,
			vals = ['-100.00', '-100.00', '-90.00', '-90.00'];

		var slider = $('.slider'),
			box = $('.box'),
			item = $('.item'),
			thing = $('.thing');

		function linkTargetFunction( value, handle, sliderInstance ){
			equal(value, vals[val1++], "Value as expected, change ("+val1+"/4).");
			ok(handle.hasClass("noUi-handle"), "Handle is really a handle.");
			ok(handle.hasClass("noUi-handle-lower"), "Handle is really the lower handle.");
			ok(sliderInstance.hasClass("noUi-target"), "Slider is really a slider.");
			ok(sliderInstance[0] === this, "Slider is scope of call.");
		}

		function linkMethodFunction( value, handle, sliderInstance ){
			equal(value, vals[val2++], "Value as expected, change ("+val2+"/4).");
			ok(handle.hasClass("noUi-handle"), "Handle is really a handle.");
			ok(sliderInstance.hasClass("noUi-target"), "Slider is really a slider.");
			ok(box[0] === this, "Element is scope of call.");
			ok(slider[0] === sliderInstance[0], "Slider argument is slider.");
		}

		slider.noUiSlider({
			 range: {
				'min': -100,
				'max': 9000
			}
			,start: [-500, 10000]
			,connect: true
			,serialization: {
				lower: [
					new Link({
						target: linkTargetFunction
					}),
					new Link({
						target: box,
						method: linkMethodFunction
					}),
					new Link({
						target: "hiddenInputField",
						format: {
							decimals: 1,
							negative: '',
							prefix: '++',
							negativeBefore: '='
						}
					})
				],
				upper: [
					new Link({
						target: item,
						method: "cake"
					}),
					new Link({
						target: thing,
						method: "html"
					})
				]
			}
		});

		equal(item.html(), '9000.00', 'Setting by custom method works.');

		ok($('input[name="hiddenInputField"]').is('input'), "Input field was generated.");
		ok($('input[name="hiddenInputField"]').val(), '=++90.0', "Value is formatted as expected.");

		
		slider.val([-90, 8051]);

		deepEqual(slider.val(), ['-90.00', '8051.00']);

		// Link updated 4 times.
		equal(val1, 4);

		equal(thing.html(), '8051.00', 'Setting by existing method works.');

	});
