var slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: [0, 10],
  connect: [false, true, false],
  range: {
      'min': [0],
      'max': [20]
  }
});

slider.noUiSlider.on('drag', function (values, handle) {
    // We know we have 2 handles on this connect,
    // so to get all handles on the connect being dragged:
    const handle1 = handle;
    const handle2 = handle + 1;

    // If we had a third handle we could:
    const handle3 = handle2 + 1;
});
