var slider = document.getElementById('slider');

noUiSlider.create(slider, /* { options } */);

// Set one handled slider
slider.noUiSlider.set(10);
slider.noUiSlider.set([150]);

// Set the upper handle,
// don't change the lower one.
slider.noUiSlider.set([null, 14]);

// Set both slider handles
slider.noUiSlider.set([13.2, 15.7]);

// Return to the 'start' values
// Does NOT reset any other slider properties
slider.noUiSlider.reset();
