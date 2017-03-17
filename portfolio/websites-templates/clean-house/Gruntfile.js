//Стандартный экспорт модуля в nodejs
module.exports = function(grunt) {
	// Инициализация конфига GruntJS
	grunt.initConfig({

		//Склеивание JS файлов
		// concat: {
		//     dist: {
		//         src: [
		//         	'js/vendor/jquery-1.11.2.js',
		//         	'js/vendor/modernizr-2.6.2.min.js',
		//         	'js/jquery.textchange.min.js', // detecting text changes (http://zurb.com/playground/jquery-text-change-custom-event)
		//         	'js/owl.carousel.min.js', // owl carousel (http://owlgraphic.com/owlcarousel/index.html)
		//             'js/masonry.pkgd.min.js', // masonry. universal grid system
		//             'js/main.js',
		//             'js/viewer.js', // product page slider (one-item.html)
		//             'js/zoom.js', // product page zoom (one-item.html)
		//             'js/jquery.fancybox.pack.js', // zoom image (one-item.html)
		//             'js/jquery.bxslider.min.js', // slider main page
		//             'js/plugins.js'
		//         ],
		//         dest: 'js/build/production.js'
		//     }
		// },

		// Склеивание CSS файлов
		concat_css: {
			options: {},
			all: {
				src: [
		        	'css/normalize.css', // normalize CSS
		          	'css/960_12_col.css', // grid
		          	'css/owl.carousel.css', // owl carousel (http://owlgraphic.com/owlcarousel/index.html)
		          	'css/jquery.fancybox.css',
		            'css/allscss.css'
		        ],
		        dest: 'css/build/production.css'
	    	}
		},

		// Сжатие общего JS файла
		// uglify: {
		//     build: {
		//         src: 'js/build/production.js',
		//         dest: 'js/build/production.min.js'
		//     }
		// },

		// SASS
		sass: {
			dist: {
				files: {
					'css/allscss.css' : ['scss/variables.scss']
				}
			}
		},

		// CSS Min
		// cssmin: {
  //         combine: {
  //           files: {
  //             'css/build/production.min.css': [
  //             	'css/normalize.css', // normalize CSS
  //             	'css/960_12_col.css', // grid
  //             	'css/owl.carousel.css', // owl carousel (http://owlgraphic.com/owlcarousel/index.html)
  //             	// 'css/owl.theme.css', // owl carousel (http://owlgraphic.com/owlcarousel/index.html)
  //             	'css/jquery.fancybox.css',
  //             	// 'css/owl.transitions.css', // owl carousel (http://owlgraphic.com/owlcarousel/index.html)
  //               'css/allscss.css'
  //               ]
  //           }
  //         }
  //       },

		watch: {
		    options: {
				livereload: true,
			},
			// scripts: {
		 //        files: ['js/*.js'],
		 //        tasks: ['concat'],
		 //        options: {
		 //            spawn: false
		 //        }
		 //    },
			css: {
				files: ['scss/*.scss','css/owl.carousel.css','css/jquery.fancybox.css'],
				tasks: ['sass','concat_css'],
		        options: {
		            spawn: false
		        }
			}
		}

	});

	// Загрузка модулей, которые предварительно установлены
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
	grunt.registerTask('default', ['sass', 'concat_css', 'watch']);
};