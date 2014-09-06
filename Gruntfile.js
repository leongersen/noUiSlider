module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			basic: {
				src: ['src/range.js', 'src/options.js', 'src/base.js'],
				dest: 'distribute/jquery.nouislider.js',
			},
			all: {
				src: ['submodules/wNumb/wNumb.js', 'submodules/libLink/jquery.libLink.js', 'distribute/jquery.nouislider.js', 'src/pips.js'],
				dest: 'distribute/jquery.nouislider.all.js',
			},
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
};
