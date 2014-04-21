new Link({
	target: function( val ){
		$('html').css({
		  'background':
		  'rgb(243,'+val+',243)'
		});
	},
	format: {
		decimals: 0
	}
})
