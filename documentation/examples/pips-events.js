var activePips = [null, null];

pipsSlider.noUiSlider.on('update', function (values, handle) {
    // Match the formatting for the pip
    var dataValue = Math.round(values[handle]);

    // Remove the active class from the current pip
    if (activePips[handle]) {
        // Find the old handle, which is still marked as active
        activeHandle = slider.querySelector('.noUi-value[data-value="' + activePips[handle] + '"]');
        // Remove the active class from the old active pip;
        // but only remove it, if the old pip values are not
        // the same!
        if (activeHandle && activePips[0] != activePips[1]) {
            activePips[handle].classList.remove('active-pip');
        }
    }

    // Find the pip matching the value
    newHandle = pipsSlider.querySelector('.noUi-value[data-value="' + dataValue + '"]');

    // Add the active class
    if (newHhandle) {
        activePips[handle] = dataValue;
        newHandle.classList.add('active-pip');
    }
});
