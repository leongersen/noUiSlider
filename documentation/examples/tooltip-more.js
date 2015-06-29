var tipHandles = tooltipSlider.getElementsByClassName('noUi-handle'),
	tooltips = [];

// Add divs to the slider handles.
for ( var i = 0; i < tipHandles.length; i++ ){
	tooltips[i] = document.createElement('div');
	tipHandles[i].appendChild(tooltips[i]);
}

// Add a class for styling
tooltips[1].className += 'tooltip';
// Add additional markup
tooltips[1].innerHTML = '<strong>Value: </strong><span></span>';
// Replace the tooltip reference with the span we just added
tooltips[1] = tooltips[1].getElementsByTagName('span')[0];

// When the slider changes, write the value to the tooltips.
tooltipSlider.noUiSlider.on('update', function( values, handle ){
	tooltips[handle].innerHTML = values[handle];
});
