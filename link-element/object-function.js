function handleSliderValue( value ){
	$(this).addClass('changed')
	$(this).text( value );

	siteSearch();
}

new Link({
	target: $("#showvalue"),
	method: handleSliderValue
})
