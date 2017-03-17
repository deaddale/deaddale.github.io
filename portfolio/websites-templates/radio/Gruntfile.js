//Стандартный экспорт модуля в nodejs
module.exports = function(grunt) {
	// Инициализация конфига GruntJS
	grunt.initConfig({

		//Склеивание JS файлов
		concat: {
		    dist: {
		        src: [
		        	'js/vendor/jquery-1.11.2.min.js',
		        	'js/jquery-ui.min.js', // draggable
		        	'js/jquery.custom-scrollbar.js', // custom scroll
		        	'js/social-share.js', // алгоритм кнопок поделиться в соцсетях
		        	// 'js/isotope.pkgd.min.js', // сетка для подкастов
		            'js/main.js',
		            'js/plugins.js'
		        ],
		        dest: 'js/build/production.js'
		    }
		},

		// Сжатие общего JS файла
		uglify: {
		    build: {
		        src: 'js/build/production.js',
		        dest: 'js/build/production.min.js'
		    }
		},

		// SASS
		sass: {
			dist: {
				files: {
					'css/allscss.css' : ['scss/variables.scss']
				}
			}
		},

		// Autoprefixer
		autoprefixer: {

            options: {
                // We need to `freeze` browsers versions for testing purposes.
                // browsers: ['opera 12', 'ff 15', 'chrome 25']
            },

            single_file: {
                src: 'css/allscss.css',
                dest: 'css/allscss-finished.css'
            },

        },

		// CSS Min
		cssmin: {
          combine: {
            files: {
				'css/production.min.css': [
					'css/allscss-finished.css'
				]
            }
          }
        },

        // live watch
		watch: {
		    options: {
				livereload: true,
			},
			scripts: {
		        files: ['js/*.js'],
		        tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false
		        }
		    },
			css: {
				files: ['scss/*.scss'],
				tasks: ['sass','autoprefixer','cssmin'],
		        options: {
		            spawn: false
		        }
			}
		}

	});

	// Загрузка модулей, которые предварительно установлены
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'watch']);
};