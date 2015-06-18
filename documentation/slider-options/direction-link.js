var directionField = document.getElementById('field');

directionSlider.on('update', function( value ){
	directionField.innerHTML = value;
});
