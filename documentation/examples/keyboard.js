var handle = keyboardSlider.querySelector('.noUi-handle');

handle.addEventListener('keydown', function( e ) {

	var value = Number( keyboardSlider.noUiSlider.get() );

	if ( e.which === 37 ) {
		keyboardSlider.noUiSlider.set( value - 10 );
	}

	if ( e.which === 39 ) {
		keyboardSlider.noUiSlider.set( value + 10 );
	}
});
