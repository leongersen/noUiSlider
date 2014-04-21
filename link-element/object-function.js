function handleSliderValue( value ){
	$(this).addClass('changed')
	$(this).text( value );

	siteSearch();
}

$.Link({
	target: $("#showvalue"),
	method: handleSliderValue
})
