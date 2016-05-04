var connectBar = document.createElement('div'),
	connectBase = connectSlider.querySelector('.noUi-base');

// Give the bar a class for styling and add it to the slider.
connectBar.className += 'connect';
connectBase.appendChild(connectBar);

connectSlider.noUiSlider.on('update', function( values, handle, a, b, handlePositions ) {

	var offset = handlePositions[handle];

	// Right offset is 100% - left offset
	if ( handle === 1 ) {
		offset = 100 - offset;
	}

	// Pick left for the first handle, right for the second.
	connectBar.style[handle ? 'right' : 'left'] = offset + '%';
});
