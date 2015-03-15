$('#slider-animate-true').noUiSlider({
	animate: true,
	start: 20,
	range: {
		min: 0,
		max: 100
	}
});

$('#slider-animate-false').noUiSlider({
	animate: false,
	start: 20,
	range: {
		min: 0,
		max: 100
	}
});

$('#set-sliders').click(function(){
	$('.sliders').val(60);
});
