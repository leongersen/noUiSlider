
	var
	// Determine the events to bind. IE11 implements pointerEvents without
	// a prefix, which breaks compatibility with the IE10 implementation.
	/** @const */
	actions = typeof window !== 'undefined' && window.navigator.pointerEnabled ? {
		start: 'pointerdown',
		move: 'pointermove',
		end: 'pointerup'
	} : typeof window !== 'undefined' && window.navigator.msPointerEnabled ? {
		start: 'MSPointerDown',
		move: 'MSPointerMove',
		end: 'MSPointerUp'
	} : {
		start: 'mousedown touchstart',
		move: 'mousemove touchmove',
		end: 'mouseup touchend'
	},
	defaultCssPrefix = 'noUi-';
