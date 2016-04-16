var handle = slider.querySelector('.noUi-handle');

handle.setAttribute('tabindex', 0);

handle.addEventListener('click', function(){
	this.focus();
});

handle.addEventListener('keydown', function( e ) {

	var value = Number( slider.noUiSlider.get() );

	switch ( e.which ) {
		case 37: slider.noUiSlider.set( value - 10 );
			break;
		case 39: slider.noUiSlider.set( value + 10 );
			break;
	}
});
