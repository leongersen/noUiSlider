function setLockedValues ( ) {
	lockedValues = [
		Number(slider1.noUiSlider.get()),
		Number(slider2.noUiSlider.get())
	];
}

slider1.noUiSlider.on('change', setLockedValues);
slider2.noUiSlider.on('change', setLockedValues);

// The value will be send to the other slider,
// using a custom function as the serialization
// method. The function uses the global 'lockedState'
// variable to decide whether the other slider is updated.
slider1.noUiSlider.on('slide', function( values, handle ){
	crossUpdate(values[handle], slider2);
});

slider2.noUiSlider.on('slide', function( values, handle ){
	crossUpdate(values[handle], slider1);
});
