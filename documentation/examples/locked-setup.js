// Store the locked state and slider values.
var lockedState = false,
	values = [60, 80],
	slider1 = $("#slider1"),
	slider2 = $("#slider2");

// When the button is clicked, the locked
// state is inverted.
$("button").click(function(){
	lockedState = !lockedState;
	$(this).text(lockedState ? 'unlock' : 'lock');
});
