// Set the slider value to 20
$("#write-button").click(function(){
	$('#slider').val( 20, {
		animate: true
	});
});

// Read the slider value.
$("#read-button").click(function(){
	alert( $('#slider').val() );
});
