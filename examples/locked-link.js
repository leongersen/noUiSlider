// The value will be send to the other slider,
// using a custom function as the serialization
// method. The function uses the global 'lockedState'
// variable to decide whether the other slider is updated.

slider1.Link('upper', slider2, crossUpdate);
slider1.Link('upper', $("#slider1-span"));

slider2.Link('upper', slider1, crossUpdate);
slider2.Link('upper', $("#slider2-span"));
