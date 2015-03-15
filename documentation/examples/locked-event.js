// When a slider changes, store the new values.
$(".slider").on('set', function(){

	// The .val() function returns a string,
	// but we wan't to do substractions, so
	// convert the values to numbers.
	values = [
		Number(slider1.val()),
		Number(slider2.val())
	];
});
