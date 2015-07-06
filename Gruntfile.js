module.exports = function(grunt) {

	var VERSION_TEMPLATE = '/*! <%= pkg.name %> - <%= pkg.version %> - ' +
	'<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */' +
	'\n\n';

	function getFiles ( ) {

		return [
			'src/js/intro.js',
			'src/js/helpers.js',
			'src/js/constants.js',
			'src/js/range.js',
			'src/js/options.js',
			'src/js/structure.js',
			'src/js/scope_start.js',
			'src/js/pips.js',
			'src/js/scope_helpers.js',
			'src/js/scope_events.js',
			'src/js/scope.js',
			'src/js/scope_end.js',
			'src/js/interface.js',
			'src/js/outro.js'
		];
	}

	var releaseFiles = [
		{ src: ['**/*'], dest: '', cwd: 'distribute/', expand: true },
		{ src: ['**/*.css'], dest: '', cwd: 'src/', expand: true }
	];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				banner: VERSION_TEMPLATE
			},
			basic: {
				src: getFiles(),
				dest: 'distribute/nouislider.js',
				nonull: true
			}
        },
		cssmin: {
			all: {
				options: {
					banner: VERSION_TEMPLATE
				},
				files: {
					'distribute/nouislider.min.css': ['src/nouislider.css', 'src/nouislider.pips.css']
				}
			}
		},
		jshint: {
			options: {
				browser: true,
				indent: false,
				laxbreak: true,
				laxcomma: true,
				validthis: true,
				curly: true,
				latedef: true,
				undef: true,
				unused: true,
				globals: { module: true, define: true, __dirname: true, require: true }
			},
			basic: ['distribute/nouislider.js']
		},
		uglify: {
			all: {
				options: {
					banner: VERSION_TEMPLATE
				},
				files: {
					'distribute/nouislider.min.js': 'distribute/nouislider.js'
				}
			}
		},
		compress: {
			all: {
				options: {
					archive: 'noUiSlider.<%= pkg.version %>.zip'
				},
				files: releaseFiles
			}
		}
    });

	// https://github.com/gruntjs/grunt-contrib-concat
    grunt.loadNpmTasks('grunt-contrib-concat');

	// https://github.com/gruntjs/grunt-contrib-uglify
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// https://github.com/gruntjs/grunt-contrib-jshint
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// https://github.com/gruntjs/grunt-contrib-cssmin
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// https://github.com/gruntjs/grunt-contrib-compress
	grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['concat', 'jshint']);
    grunt.registerTask('create', ['concat', 'jshint', 'uglify', 'cssmin']);
	grunt.registerTask('release', ['compress']);
};
