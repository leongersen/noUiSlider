var tooltipSlider = document.getElementById('slider-tooltips');

noUiSlider.create(tooltipSlider, {
    start: [20, 80, 120],
    tooltips: [
        false, // no tooltip
        wNumb({decimals: 1}), // tooltip with custom formatting
        true // tooltip with default formatting
    ],
    /**
     * Tooltip with default formatting on all handles:
     * tooltips: true,
     *
     * Tooltip with specific formatting on all handles:
     * tooltips: {
     *     to: ...,
     *     from: ...
     * }
     *
     * Tooltip with specific formatting on each handle:
     * tooltips: [
     *     { to: ..., from: ... },
     *     { to: ..., from: ... },
     *     { to: ..., from: ... },
     * ]
     */
    range: {
        'min': 0,
        'max': 200
    }
});
