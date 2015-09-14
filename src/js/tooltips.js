function tooltips( tooltipsOptions ) {
  var positionClasses = [Classes[19], Classes[20]];
  var formatTooltipValue = tooltipsOptions.format ? tooltipsOptions.format : defaultFormatTooltipValue;

  var tooltips = scope_Handles.map(function addTooltip(handle, handleId) {
    var element = document.createElement('div');
    element.className = Classes[18];
    return handle.firstChild.appendChild(element);
  });

  bindEvent('update', function updateTooltip(formattedValues, handleId, rawValues) {
    tooltips[handleId].innerHTML = formatTooltipValue(formattedValues[handleId], rawValues[handleId]);
  });

  function defaultFormatTooltipValue(formattedValue, rawValue) {
    return formattedValue;
  }
}
