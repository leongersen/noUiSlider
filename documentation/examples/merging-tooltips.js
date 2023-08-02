/**
 * @param slider HtmlElement with an initialized slider
 * @param separator String joining tooltips
 */
export function mergeTooltips(slider, separator) {
    var textIsRtl = window.getComputedStyle(slider).direction === "rtl";
    var isRtl = slider.noUiSlider.options.direction === "rtl";
    var isVertical = slider.noUiSlider.options.orientation === "vertical";
    var tooltips = slider.noUiSlider.getTooltips();
    var origins = slider.noUiSlider.getOrigins();
  
    // Move tooltips into the origin element. The default stylesheet handles this.
    tooltips.forEach(function (tooltip, index) {
      if (tooltip) {
        origins[index].appendChild(tooltip);
      }
    });
  
    slider.noUiSlider.on("update", function (
      values,
      handle,
      unencoded,
      tap,
      positions
    ) {
      var pools = [[]];
      var poolPositions = [[]];
      var poolValues = [[]];
      var atPool = 0;
  
      // Assign the first tooltip to the first pool, if the tooltip is configured
      if (tooltips[0]) {
        pools[0][0] = 0;
        poolPositions[0][0] = positions[0];
        poolValues[0][0] = values[0];
      }
  
      for (var i = 1; i < positions.length; i++) {
        const tooltipLeft = tooltips[i - 1].getBoundingClientRect();
        const tooltipRight = tooltips[i].getBoundingClientRect();
        if (
          !(
            tooltipLeft.x < tooltipRight.x &&
            tooltipLeft.x + tooltipLeft.width > tooltipRight.x
          )
        ) {
          atPool++;
          pools[atPool] = [];
          poolValues[atPool] = [];
          poolPositions[atPool] = [];
        }
  
        if (tooltips[i]) {
          pools[atPool].push(i);
          poolValues[atPool].push(values[i]);
          poolPositions[atPool].push(positions[i]);
        }
      }
  
      pools.forEach(function (pool, poolIndex) {
        var handlesInPool = pool.length;
  
        for (var j = 0; j < handlesInPool; j++) {
          var handleNumber = pool[j];
  
          if (j === handlesInPool - 1) {
            var offset = 0;
  
            poolPositions[poolIndex].forEach(function (value) {
              offset += 1000 - value;
            });
  
            var direction = isVertical ? "bottom" : "right";
            var last = isRtl ? 0 : handlesInPool - 1;
            var lastOffset = 1000 - poolPositions[poolIndex][last];
            offset =
              (textIsRtl && !isVertical ? 100 : 0) +
              offset / handlesInPool -
              lastOffset;
  
            // Center this tooltip over the affected handles
            tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(
              separator
            );
            tooltips[handleNumber].style.removeProperty("visibility");
  
            tooltips[handleNumber].style[direction] = offset + "%";
          } else {
            // Hide this tooltip
            tooltips[handleNumber].style.visibility = "hidden";
          }
        }
      });
    });
}