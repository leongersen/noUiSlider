var dateValues = [
	document.getElementById('event-start'),
	document.getElementById('event-end')
];

dateSlider.noUiSlider.on('update', function( values, handle ) {
	dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
});
