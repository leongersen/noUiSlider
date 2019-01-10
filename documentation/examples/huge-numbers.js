// Note how these are 'string' values, not numbers.
var range = [
    '0', '2097152', '4194304',
    '8388608', '16777216', '33554432',
    '67108864', '134217728', '268435456',
    '536870912', '1073741824',
    '2147483648', '4294967296',
    '8589934592'
];

bigValueSlider.noUiSlider.on('update', function (values, handle) {
    bigValueSpan.innerHTML = range[values[handle]];
});
