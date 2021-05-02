module.exports = {
    files: 'dist/nouislider.js',
    from: [
        '%%REPLACE_THIS_WITH_VERSION%%',
    ],
    to: [
        process.env.npm_package_version,
    ]
};
