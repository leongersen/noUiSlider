var slider = document.getElementById('slider');

noUiSlider.create(slider, /* { options } */);

// Set one handled slider
slider.noUiSlider.set(10);
slider.noUiSlider.set([150]);

// Set the upper handle on a slider with two handles,
// don't change the lower one
slider.noUiSlider.set([null, 14]);

// On a slider with three handles,
// set the third to 12 (the handleNumber is 0-indexed)
// Then: fire the set event
slider.noUiSlider.setHandle(2, 12, true);

// Set both slider handles on a slider with two handles
slider.noUiSlider.set([13.2, 15.7]);

// Return to the 'start' values
// Does NOT reset any other slider properties
slider.noUiSlider.reset();
