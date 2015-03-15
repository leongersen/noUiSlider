function setColor(){

	// Get the slider values,
	// stick them together.
	var color = 'rgb(' +
		$("#red").val() + ',' +
		$("#green").val() + ',' +
		$("#blue").val() + ')';

	// Fill the color box.
	$(".result").css({
		background: color,
		color: color
	});
}
