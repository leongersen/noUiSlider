module.exports = function(grunt) {

	var VERSION_TEMPLATE = '/*! <%= pkg.name %> - <%= pkg.version %> - ' +
	'<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */' +
	'\n\n',
        COMMONJS_BANNER = "// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.\n",
        COMMONJS_HEAD = "\nmodule.exports = function(jQuery) {\n",
        COMMONJS_FOOT = "\n};\n";
  
	function getFiles ( append ) {

		var files = [
			'src/js/helpers/intro.js',
			'src/js/helpers.js',
			'src/js/constants.js',
			'src/js/range.js',
			'src/js/options.js',
			'src/js/structure.js',
			'src/js/scope_start.js',
			'src/js/scope_helpers.js',
			'src/js/scope_link.js',
			'src/js/scope_events.js',
			'src/js/scope.js',
			'src/js/scope_end.js',
			'src/js/interface.js'
		];

		if ( append ) {
			files = files.concat(append);
		}

		files.push('src/js/helpers/outro.js');

		return files;
	}

	var releaseFiles = [
		{ src: ['**/*'], dest: '', cwd: 'distribute/', expand: true },
		{ src: ['**/*.css'], dest: '', cwd: 'src/', expand: true },
		{ src: ['**/archive.md'], rename: function(){ return 'README.md'; }, dest: '', cwd: 'src/', expand: true }
	];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				banner: VERSION_TEMPLATE
			},
			basic: {
				src: getFiles(),
				dest: 'distribute/jquery.nouislider.js',
				nonull: true
			},
			all: {
				src: ['submodules/wNumb/wNumb.js', 'submodules/libLink/jquery.libLink.js'].concat(getFiles('src/js/pips.js')),
				dest: 'distribute/jquery.nouislider.all.js',
				nonull: true
			},
        },
		cssmin: {
			all: {
				options: {
					banner: VERSION_TEMPLATE
				},
				files: {
					'distribute/jquery.nouislider.min.css': ['src/jquery.nouislider.css'],
					'distribute/jquery.nouislider.pips.min.css': ['src/jquery.nouislider.pips.css']
				}
			}
		},
		'string-replace': {
			version: {
				files: {
					'nouislider.jquery.json': 'src/jquery.json'
				},
				options: {
					replacements: [{
						pattern: /{{VERSION}}/g,
						replacement: '<%= pkg.version %>'
					}]
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
				newcap: false
			},
			basic: ['distribute/jquery.nouislider.js'],
			all: ['distribute/jquery.nouislider.all.js']
		},
		uglify: {
			all: {
				options: {
					banner: VERSION_TEMPLATE
				},
				files: {
					'distribute/jquery.nouislider.min.js': 'distribute/jquery.nouislider.js',
					'distribute/jquery.nouislider.all.min.js': 'distribute/jquery.nouislider.all.js'
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

    grunt.registerTask("commonjs", "Generate CommonJS entrypoint module in dist dir.", function () {
      var finalCode = COMMONJS_BANNER;

      finalCode += COMMONJS_HEAD;
      finalCode += grunt.file.read("distribute/jquery.nouislider.js");
      finalCode += COMMONJS_FOOT;
      grunt.file.write("distribute/npm.js", finalCode);
    });
  
	// https://github.com/gruntjs/grunt-contrib-concat
    grunt.loadNpmTasks('grunt-contrib-concat');

	// https://github.com/gruntjs/grunt-contrib-uglify
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// https://github.com/gruntjs/grunt-contrib-jshint
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// https://github.com/erickrdch/grunt-string-replace
	grunt.loadNpmTasks('grunt-string-replace');

	// https://github.com/gruntjs/grunt-contrib-cssmin
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// https://github.com/gruntjs/grunt-contrib-compress
	grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['concat', 'jshint']);
    grunt.registerTask('create', ['concat', 'jshint', 'uglify', 'cssmin', 'commonjs']);
	grunt.registerTask('release', ['string-replace', 'compress']);
};
