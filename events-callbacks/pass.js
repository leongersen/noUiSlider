// These notations are (almost) equivalent:
var onSlide = function(){ ... };
function onSlide(){ ... };

// Reference a function
$('.slider').noUiSlider({
	slide: onSlide
});

// Provide a function directly
$('#slider').noUiSlider({
	set: function(){
	// The slider is the scope, so:
	// $(this) == $('#slider')
	}
});
