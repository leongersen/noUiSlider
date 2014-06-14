
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

		var slider = $('.slider'),
			box = $('.box'),
			item = $('.item'),
			thing = $('.thing');

		var ltfCount = 0, lmfCount = 0, Expect = ['-100.00', '-90.00'];
			
		function linkTargetFunction( value, handle, sliderInstance ){
			
			equal(value, Expect[ltfCount], "Value as expected, change ("+(ltfCount++)+"/2).");
			
			ok(handle.hasClass("noUi-handle"), "Handle is really a handle.");
			ok(handle.hasClass("noUi-handle-lower"), "Handle is really the lower handle.");
			ok(sliderInstance.hasClass("noUi-target"), "Slider is really a slider.");
			ok(sliderInstance[0] === this[0], "Slider is scope of call and $.");
		}

		function linkMethodFunction( value, handle, sliderInstance ){
			
			equal(value, Expect[lmfCount], "Value as expected, change ("+(lmfCount++)+"/2).");
			
			ok(handle.hasClass("noUi-handle"), "Handle is really a handle.");
			ok(sliderInstance.hasClass("noUi-target"), "Slider is really a slider.");
			ok(box[0] === this[0], "Element is scope of call and $.");
			ok(slider[0] === sliderInstance[0], "Slider argument is slider.");
		}

		slider.noUiSlider({
			 range: {
				'min': -100,
				'max': 9000
			},
			start: [-500, 10000],
			connect: true,
			format: wNumb({
				decimals: 2
			})
		});

		slider.Link('lower', {
			target: linkTargetFunction
		}, {
			target: box,
			method: linkMethodFunction
		}, {
			target: "hiddenInputField",
			format: wNumb({
				decimals: 1,
				negative: '',
				prefix: '++',
				negativeBefore: '='
			})
		})
		
		slider.Link('upper', {
			target: item,
			method: "cake"
		}, {
			target: thing,
			method: "html"
		});
		
		// See if values bounced properly.
		deepEqual(slider.val(), ['-100.00', '9000.00'], 'Slider has proper value');
			
		// Check hidden input updates.
		ok($('input[name="hiddenInputField"]').is('input'), "Input field was generated.");
		equal($('input[name="hiddenInputField"]').val(), '=++100.0', "Value is formatted as expected.");

		equal(item.html(), '9000.00', 'Setting by custom method works.');
		
		slider.val([-90, 8051]);

		deepEqual(slider.val(), ['-90.00', '8051.00']);

		equal(thing.html(), '8051.00', 'Setting by existing method works.');

		equal(ltfCount, 2, 'Pre-bound link updated 4 times.');
		equal(lmfCount, 2, 'Post-bound Link updated 2 times.');
	});
