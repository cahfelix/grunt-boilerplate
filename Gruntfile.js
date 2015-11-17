module.exports = function(grunt) {

	/*======================================================================
	// Variaveis
	/*=====================================================================*/
	var config = {
		assetsPath: 'assets'
	}

	grunt.initConfig({
		// config: config,

		// gets the package vars
		pkg: grunt.file.readJSON('package.json'),

		// setting folder templates
		dirs: {
			assetsPath: 'assets',
			css: 		'assets/css',
			js: 		'assets/js',
			sass: 		'assets/sass',
			img:    	'assets/img',
			fonts: 		'assets/fonts',
			core: 		'core',
			tmp: 		'tmp'
		},		

		// javascript linting with jshint
		jshint: {
			files: [
				'gruntfile.js', 
				'<%= dirs.js %>/application.js'
			]			 
  		},
			
		// uglify to concat and minify			
		uglify: {
			options: {
				mangle: false,
				except: ['<%= dirs.js %>/bootstrap']
			},	
			my_target: {
				expand: true,
				cwd:    '<%= dirs.js %>/orig',
				src:    '*.js',
				dest:   '<%= dirs.js %>/orig',
				ext:    '.min.js',		
			},					
			// dist: {
			// 	files: {
			// 		'<%= dirs.js %>/application.min.js': [
			// 			'<%= dirs.js %>/libs/*.js', // External libs/plugins
			// 			'<%= dirs.js %>/main.js'    // Custom JavaScript
			// 		]
			// 	}
			// },
			// bootstrap: {
			// 	files: {
			// 		'<%= dirs.js %>/libs/bootstrap.min.js': [
			// 			'<%= dirs.js %>/bootstrap/transition.js',
			// 			'<%= dirs.js %>/bootstrap/alert.js',
			// 			'<%= dirs.js %>/bootstrap/button.js',
			// 			'<%= dirs.js %>/bootstrap/carousel.js',
			// 			'<%= dirs.js %>/bootstrap/collapse.js',
			// 			'<%= dirs.js %>/bootstrap/dropdown.js',
			// 			'<%= dirs.js %>/bootstrap/modal.js',
			// 			'<%= dirs.js %>/bootstrap/tooltip.js',
			// 			'<%= dirs.js %>/bootstrap/popover.js',
			// 			'<%= dirs.js %>/bootstrap/scrollspy.js',
			// 			'<%= dirs.js %>/bootstrap/tab.js',
			// 			'<%= dirs.js %>/bootstrap/affix.js'
			// 		]
			// 	}
			// }
		},		
		sass: {
		    dist: {
		      options: {
		      	loadPath: require('node-bourbon').includePaths,
		        loadPath: require('node-neat').includePaths
		        
		      },
		      files: {
		      	'<%= dirs.css %>/application.css': '<%= dirs.sass %>/application.scss',
		        // 'path/to/output.css': 'path/to/input.scss'
		      }
		    }
		},	
		combine_mq: {
		    default_options: {
			    src: '<%= dirs.css %>/application.css',
			    dest: '<%= dirs.css %>/application.css'
			},			
		},		
	    csscomb: {
	        dynamic_mappings: {
	            expand: true,
	            cwd: '<%= dirs.css %>',
	            src: ['application.css'],
	            dest: '<%= dirs.css %>',
	            ext: '.resorted.css'
	        }
	    },			
		cssmin: {
			minify: {
				expand: true,
				cwd:    '<%= dirs.css %>',
				src:    ['*.css', '!*.min.css'],
				dest:   '<%= dirs.css %>',
				ext:    '.min.css'
			}
		},
		concat: {
			css: {
				src:  ['<%= dirs.css %>/*.min.css'],
				dest: '<%= dirs.css %>/application.min.css'
			},
			js: {
				src:  ['<%= dirs.js %>/orig/*.min.js'],
				dest: '<%= dirs.js %>/application.min.js'

			},
			libsjs: {
				src:  ['<%= dirs.js %>/libs/*.min.js'],
				dest: '<%= dirs.js %>/libs.min.js'
			}
		},		
		sprite: {
			all: {
				src:     '<%= dirs.img %>/sprites/*.png',
				dest:    '<%= dirs.img %>/spritesheet.png', 
				destCss: '<%= dirs.css %>/sprite.css',
				imgPath: '<%= dirs.img %>/spritesheet.png',				
				imgOpts: {quality: 100},
				// engine: 'gmsmith'
			}
		},

		// image optimization
		imagemin: {
			png: {
				options: {
	            	optimizationLevel: 7
	         	},
	         	files: [{
	            	expand: true,
	            	cwd:    '<%= dirs.img %>/',
	            	src:    ['**/*.png'],
	            	dest:   '<%= dirs.img %>/'
	         	}]
	      	},
	      	jpg: {
	        	options: {
	            	progressive: true
	        	},
	         	files: [{
	            	expand: true,
	            	cwd:    '<%= dirs.img %>/',
	            	src:    ['**/*.jpg'],
	            	dest:   '<%= dirs.img %>/'
	         	}]
	      	}
   		},
		scsslint: {
			allFiles: ['<%= config.assetsPath %>/sass/**/*.scss'],

			options: {
				bundleExec: false,
				config: '.scss-lint.yml',
				colorizeOutput: true,
				exclude: ['<%= config.assetsPath %>/sass/bootstrap/**/*.scss']
			}
		},   		

		// watch for changes and trigger compass, jshint, uglify and livereload browser
		watch: {
			sass: {
				files: ['<%= dirs.sass %>/**/*.scss'],
				// files: '**/*.scss',
				tasks: [/*'scsslint',*/ 'sass', 'combine_mq', 'cssmin', 'concat:css']
			},
			// compass: {
			// 	files: ['<%= dirs.sass %>/**'],
			// 	tasks: ['compass']
			// },
			// ,
			// js: {
			// 	files: ['<%= jshint.all %>'],
			// 	tasks: ['jshint', 'uglify']
			// }
			options: {
				liverload: true,
			}			
		},


		// compile scss/sass files to CSS
		compass: {
	      options: {
	        config: 'config/config.rb'
	      }
	    },

		// downloads dependencies
		curl: {
			bootstrap_sass: {
				src: 'https://github.com/twbs/bootstrap-sass/archive/master.zip',
				dest: '<%= dirs.tmp %>/bootstrap-sass.zip'
			}
		},
		// unzip files
		unzip: {
			bootstrap_scss: {
				src: '<%= dirs.tmp %>/bootstrap-sass.zip',
				dest: '<%= dirs.tmp %>/'
			}
		},
		// renames and moves directories and files
		rename: {
			bootstrap_scss: {
				src: '<%= dirs.tmp %>/bootstrap-sass-master/assets/stylesheets/bootstrap',
				dest: '<%= dirs.sass %>/bootstrap'
			},
			bootstrap_js: {
				src: '<%= dirs.tmp %>/bootstrap-sass-master/assets/javascripts/bootstrap',
				dest: '<%= dirs.js %>/bootstrap'
			},
			bootstrap_fonts: {
				src: '<%= dirs.tmp %>/bootstrap-sass-master/assets/fonts/bootstrap',
				dest: '<%= dirs.fonts %>/bootstrap'
			}
		},		

    	// clean directories and files
		clean: { // ler documentacao de clean
			options: {
				force: true
			},
			bootstrap_prepare: [
				'<%= dirs.tmp %>',
				'<%= dirs.sass %>/bootstrap/',
				'<%= dirs.js %>/bootstrap/',
				'<%= dirs.js %>/libs/bootstrap.min.js',
				'<%= dirs.fonts %>/bootstrap/'
			],			
			bootstrap: [
				// '<%= dirs.sass %>/bootstrap/bootstrap.scss',
				'<%= dirs.tmp %>'
			],
			// tmp: ["tmp"]
   			// files: ['<%= config.assetsPath %>/css', '<%= config.assetsPath %>/js', 'node_modules/**/*.info']
   		},
		// deploy via rsync
		rsync: {
			options: {
				args: ['--verbose'],
				exclude: [
					'**.DS_Store',
					'**Thumbs.db',
					'.editorconfig',
					'.git/',
					'.gitignore',
					'.jshintrc',
					'sass/',
					'src/',
					'README.md'
				],
				recursive: true,
				syncDest: true
			},
			staging: {
				options: {
					src: '../',
					dest: '~/PATH/wp-content/themes/odin',
					host: 'user@host.com'
				}
			},
			production: {
				options: {
					src: '../',
					dest: '~/PATH/wp-content/themes/odin',
					host: 'user@host.com'
				}
			}
		}
	});

	/*=======================================================================
	// Plugins
	/*=====================================================================*/	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-scss-lint');

	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-contrib-rename');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');


	grunt.loadNpmTasks('grunt-combine-mq');
	grunt.loadNpmTasks('grunt-csscomb');

	/*=======================================================================
	// Tarefas
	/*=====================================================================*/
	

	// Default Task
	grunt.registerTask( 'default', [
		// 'jshint',
		// 'uglify',
		// 'compass',
		'sass',
		'combine_mq',
		// 'csscomb',
		'cssmin',
		'concat',
		'watch'
	] );



	// grunt.registerTask('default', [/*'uglify',*/ 'sass', 'cssmin', 'concat', /*'imagemin', 'scsslint', 'clean',*/ 'watch']);
	// grunt.registerTask('default', [, 'clean']);


	// Bootstrap Task
	grunt.registerTask( 'bootstrap', [
		'clean:bootstrap_prepare',
		'curl:bootstrap_sass',
		'unzip:bootstrap_scss',
		'rename:bootstrap_scss',
		'rename:bootstrap_js',
		'rename:bootstrap_fonts',
		'clean:bootstrap'
		// 'uglify:bootstrap',
		// 'compass'
	]);

	grunt.registerTask(
		'sass-compile',
		'Compile your sass files, minifies your css files and concat them into a single file',
		function () { grunt.task.run([/*'scsslint',*/ 'sass', 'combine_mq', 'cssmin', 'concat:css']);
	});
	
	grunt.registerTask(
		'sass-watch',
		'Watch your sass files an compile them into css',
		function () { grunt.task.run(['watch']);
	});
	
	grunt.registerTask(
		'js-compressor',
		'Minifies your js files and concat them into a single file',
		function () { grunt.task.run(['uglify', 'concat:js']);
	});
	
	grunt.registerTask(
		'spritesheet',
		'Generate your spritesheet file',
		function () { grunt.task.run(['sprite']);
	});
	
	// Optimize Images Task
	grunt.registerTask(
		'image-compressor',
		'Optmizate your images to improve performance',
		function () { grunt.task.run(['imagemin']);
	});

	// Short aliases
	grunt.registerTask( 'w', ['watch'] );
	grunt.registerTask( 'o', ['optimize'] );
	grunt.registerTask( 'f', ['ftp'] );
	grunt.registerTask( 'r', ['rsync'] );
	grunt.registerTask( 'c', ['compress'] );

};