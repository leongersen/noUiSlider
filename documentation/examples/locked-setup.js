// Store the locked state and slider values.
var lockedState = false,
	lockedSlider = false,
	lockedValues = [60, 80],
	slider1 = document.getElementById('slider1'),
	slider2 = document.getElementById('slider2'),
	lockButton = document.getElementById('lockbutton'),
	slider1Value = document.getElementById('slider1-span'),
	slider2Value = document.getElementById('slider2-span');

// When the button is clicked, the locked
// state is inverted.
lockButton.addEventListener('click', function(){
	lockedState = !lockedState;
	this.textContent = lockedState ? 'unlock' : 'lock';
});
