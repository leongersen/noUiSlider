
	test( "Value setting/getting on normal inputs", function(){

		Q.html('\
			<input id="one">\
			<input id="two">\
			<input id="three">\
			<div id="simpleslider"></div>\
		');

		var one = $("#one");
		var two = $("#two");
		var three = $("#three");

		var slider = $("#simpleslider").noUiSlider({
			range: { min: 20, max: 120 },
			start: 30
		});

		one.val(35);
		equal(one.val(), 35);

		one.val(35);
		equal(one.val(), 35);

		two.val( 40 );
		equal(two.val(), 40);

		slider.add(one).val(90);

		equal(slider.val(), '90.00');
		equal(one.val(), 90);

		Q.find("input").val(60);

		equal(one.val(), 60);
		equal(two.val(), 60);
		equal(three.val(), 60);

		three.val(50);

		ok(one[0] === one.val(10)[0]);
		ok(two[0] === two.val(20)[0]);

	});
