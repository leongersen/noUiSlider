function setText( value, handleElement, slider ){
	$("#someElement").text( value );
}

// Link accepts functions too.
// The arguments are the slider value,
// the .noUi-handle element and the slider instance.
$("#rangeSlider").Link('upper').to(setText);

// When you pass a string to a link,
// it will create a hidden input.
// You'll see the value appear when you
// alert the form contents.
$("#rangeSlider").Link('upper').to("inputName");
