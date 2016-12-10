var slider = document.getElementById('slider-color');

noUiSlider.create(slider, {
	start: [ 4000, 8000, 12000, 16000 ],
	connect: [false, true, true, true, true],
	range: {
		'min': [  2000 ],
		'max': [ 20000 ]
	}
});

var connect = slider.querySelectorAll('.noUi-connect');
var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];

for ( var i = 0; i < connect.length; i++ ) {
    connect[i].classList.add(classes[i]);
}
