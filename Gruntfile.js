module.exports = function(grunt) {

	function getFiles ( append ) {

		var files = [
			'src/helpers/intro.js',
			'src/helpers.js',
			'src/constants.js',
			'src/range.js',
			'src/options.js',
			'src/structure.js',
			'src/scope_start.js',
			'src/scope_helpers.js',
			'src/scope_link.js',
			'src/scope_events.js',
			'src/scope.js',
			'src/scope_end.js',
			'src/interface.js'
		];

		if ( append ) {
			files = files.concat(append);
		}

		files.push('src/helpers/outro.js');

		return files;
	}

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */' +
					'\n\n',
			},
			basic: {
				src: getFiles(),
				dest: 'distribute/jquery.nouislider.js',
			},
			all: {
				src: ['submodules/wNumb/wNumb.js', 'submodules/libLink/jquery.libLink.js'].concat(getFiles('src/pips.js')),
				dest: 'distribute/jquery.nouislider.all.js',
			},
        },
		jslint: {
			basic: {
				options: {
					errorsOnly: false,
					log: 'distribute/jslint.log'
				},
				src: [
					'distribute/jquery.nouislider.js'
				]
			}
		},
		uglify: {
			build: {
				files: {
					'distribute/jquery.nouislider.min.js': 'distribute/jquery.nouislider.js',
					'distribute/jquery.nouislider.all.min.js': 'distribute/jquery.nouislider.all.js'
				}
			}
		}
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('default', ['jslint', 'concat']);
    grunt.registerTask('merge', ['concat']);
    grunt.registerTask('min', ['jslint', 'concat', 'uglify']);
};
