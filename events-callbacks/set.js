// Won't trigger the 'set' callback:
$('.slider').val(30);

// Will trigger the 'set' callback:
$('.slider').val(30, { set: true });
