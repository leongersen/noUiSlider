module.exports = {
    files: 'distribute/nouislider.js',
    from: [
        '%%REPLACE_THIS_WITH_VERSION%%',
        'define(["require", "exports"], factory);'
    ],
    to: [
        process.env.npm_package_version,
        'define(["require", "exports"], factory);' + "\n" + '    } else {' + "\n" + '        factory({}, window);'
    ]
};
