$("#slider-format").noUiSlider({
	start: [ 20 ],
	step: 10,
	range: {
		'min': [ 20 ],
		'max': [ 80 ]
	},
	format: {
	  to: function ( value ) {
		return value + ',-';
	  },
	  from: function ( value ) {
		return value.replace(',-', '');
	  }
	}
});
