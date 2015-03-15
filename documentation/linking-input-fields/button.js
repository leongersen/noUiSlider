$('button').click(function(){
	// Use jQuery to make get the values from the form.
	// We'll decode the generated URL to keep it readable.
	alert(decodeURIComponent( $("#moneyForm").serialize() ));
	
	// Don't submit the form.
	return false;
});
