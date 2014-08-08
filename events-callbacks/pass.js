// These notations are (almost) equivalent:
var onSlide = function(){ ... };
function onSlide(){ ... };

// Reference a function
$('.slider').on('slide', onSlide);

// Provide a function directly
$('#slider').on('set', function(){

	// The slider is the scope, so:
	// $(this) == $('#slider')
});
