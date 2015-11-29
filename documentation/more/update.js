var button1 = document.getElementById('update-1'),
	button2 = document.getElementById('update-2');

function updateSliderRange ( min, max ) {
	updateSlider.noUiSlider.updateOptions({
		range: {
			'min': min,
			'max': max
		}
	});
}
	
button1.addEventListener('click', function(){
	updateSliderRange(20, 50);
});

button2.addEventListener('click', function(){
	updateSliderRange(10, 40);
});
