$('#soft').on('set', function ( event, value ) {
	if ( value < 20 ) {
		$(this).val(20);
	} else if ( value > 80 ) {
		$(this).val(80);
	}
});
