// Store the locked state and slider values.
var lockedState = false,
	values = [60, 60],
	slider1 = $("#slider1"),
	slider2 = $("#slider2");

// When the button is clicked, the locked
// state is inverted.
$("button").click(function(){
	lockedState = !lockedState;
	$(this).text(lockedState ? 'unlock' : 'lock');
});

function crossUpdate ( value, handle, slider ) {

	// If the sliders aren't interlocked, don't
	// cross-update.
	if ( !lockedState ) return;

	// Select whether to increase or decrease
	// the other slider value.
	var lValue = slider1.is(slider) ? 1 : 0,
		hValue = lValue ? 0 : 1;

	// Modify the slider value.
	value -= ( values[hValue] - values[lValue] );

	// Set the other slider value. Set the update
	// option to false, so that the slider doesn't
	// send back another .val() call.
	$(this).val( value, {
		update: false
	});
}

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

slider1.noUiSlider({
	range: {
		'min': [  50 ],
		'max': [ 100 ]
	},
	start: [ 60 ],
	serialization: {
		lower: [

// The value will be send to the other slider,
// using a custom function as the serialization
// method. The function uses the global 'lockedState'
// variable to decide whether the other slider is updated.
			$.Link({
				target: slider2,
				method: crossUpdate
			}, false),

			$.Link({
				target: $("#slider1-span")
			})

		]
	},
});

slider2.noUiSlider({
	range: {
		'min': [  50 ],
		'max': [ 100 ]
	},
	start: [ 80 ],
	serialization: {
		lower: [

			$.Link({
				target: slider1,
				method: crossUpdate
			}, false),

			$.Link({
				target: $("#slider2-span")
			})

		]
	}
});
