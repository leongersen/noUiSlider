
	function defaultFormatTooltipValue ( formattedValue ) {
		return formattedValue;
	}

	function addTooltip ( handle ) {
		var element = document.createElement('div');
		element.className = cssClasses[18];
		return handle.firstChild.appendChild(element);
	}

	// The tooltips option is a shorthand for using the 'update' event.
	function tooltips ( tooltipsOptions ) {

		var formatTooltipValue = tooltipsOptions.format ? tooltipsOptions.format : defaultFormatTooltipValue,
			tips = scope_Handles.map(addTooltip);

		bindEvent('update', function(formattedValues, handleId, rawValues) {
			tips[handleId].innerHTML = formatTooltipValue(formattedValues[handleId], rawValues[handleId]);
		});
	}
