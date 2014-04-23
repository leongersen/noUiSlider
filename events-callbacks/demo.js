$.fn.tShow = function(x){
	var s = $(this).addClass('tShow');
	setTimeout(function(){
		s.removeClass('tShow');
	},x);
};

$("#setter1").click(function(){
	$("#eventslider").val([ 5, 15 ]);
});
$("#setter2").click(function(){
	$("#eventslider").val([ 5, 15 ], true);
});

$("#eventslider").noUiSlider({
	start: [ 0, 10 ],
	range: {
		'min': [ 0 ],
		'max': [ 20 ]
	},
	serialization: {
		lower: [
			$.Link({
				target: $("#input-log")
			})		
		]
	}
}).on({
	slide: function(){
		$("#l-slide").tShow(450);
	},
	set: function(){
		$("#l-set").tShow(450);
	},
	change: function(){
		$("#l-change").tShow(450);
	}
});
