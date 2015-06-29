// To disable
slider.setAttribute('disabled', true);

// To re-enable
slider.removeAttribute('disabled');

// To disable one handle
var origins = slider.getElementsByClassName('noUi-origin');
origins[0].setAttribute('disabled', true);
