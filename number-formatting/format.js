new Link(
	target: $("span"),
	method: "html",
	format: {
		decimals: 2,
		mark: ',',
		encoder: function( value ){
			return value * 1.6;
		}
	}
);
