
	function addTooltip ( handle ) {
		var element = document.createElement('div');
		element.className = cssClasses[18];
		return handle.firstChild.appendChild(element);
	}

	// The tooltips option is a shorthand for using the 'update' event.
	function tooltips ( ) {

		var tips = scope_Handles.map(addTooltip);
		
		if ( options.dir ) {
			tips.reverse();
		}

		bindEvent('update', function(f, o, r) {
			tips[o].innerHTML = options.tooltips[o] ? options.tooltips[o].to(r[o]) : f[o];
		});
	}
