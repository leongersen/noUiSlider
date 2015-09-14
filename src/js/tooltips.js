function tooltips( tooltipsOptions ) {
  var positionClasses = [cssClasses[19], cssClasses[20]];
  var formatTooltipValue = tooltipsOptions.format ? tooltipsOptions.format : defaultFormatTooltipValue;

  var tooltips = scope_Handles.map(function addTooltip(handle, handleId) {
    var element = document.createElement('div');
    element.className = cssClasses[18];
    return handle.firstChild.appendChild(element);
  });

  bindEvent('update', function updateTooltip(formattedValues, handleId, rawValues) {
    tooltips[handleId].innerHTML = formatTooltipValue(formattedValues[handleId], rawValues[handleId]);
  });

  function defaultFormatTooltipValue(formattedValue, rawValue) {
    return formattedValue;
  }
}
