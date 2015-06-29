var connectBar = document.createElement('div'),
	connectBase = connectSlider.getElementsByClassName('noUi-base')[0],
	connectHandles = connectSlider.getElementsByClassName('noUi-origin');

// Give the bar a class for styling and add it to the slider.
connectBar.className += 'connect';
connectBase.appendChild(connectBar);

connectSlider.noUiSlider.on('update', function( values, handle ) {

	// Pick left for the first handle, right for the second.
	var side = handle ? 'right' : 'left',
	// Get the handle position and trim the '%' sign.
		offset = (connectHandles[handle].style.left).slice(0, - 1);

	// Right offset is 100% - left offset
	if ( handle === 1 ) {
		offset = 100 - offset;
	}

	connectBar.style[side] = offset + '%';
});
