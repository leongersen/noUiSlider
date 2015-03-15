$.fn.tShow = function(x){
	var s = $(this).addClass('tShow');
	setTimeout(function(){
		s.removeClass('tShow');
	},x);
};

$("#setter1").click(function(){
	$("#slider-events").val([ 5, 15 ]);
});

$("#slider-events").noUiSlider({
	start: [ 0, 10 ],
	range: {
		'min': [ 0 ],
		'max': [ 20 ]
	}
});

$("#slider-events").Link('lower').to($("#input-log"));
