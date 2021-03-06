module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Catch `Source file not found.` warnings and fail HARD.
    var gruntLogWarn = grunt.log.warn;
    grunt.log.warn = function(err) {
      var patt = new RegExp("^Source file (.*) not found.$");
      if (patt.test(err)) {
        grunt.fail.warn(err);
      } else {
        gruntLogWarn(err);
      }
    };

    grunt.initConfig({

        sass: {
            options: {
                outputStyle: 'nested', // [compressed | nested] // TODO: set to compressed for PROD.
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        src: 'sass/main.scss',
                        dest: 'static/main.css',
                        nonull: true
                    },
                    {
                        src: 'sass/editor.scss',
                        dest: 'static/editor.css',
                        nonull: true
                    }
                ]
            }
        },

        // Check this Gruntfile and all js in the scripts dir
        // if they are valid js. jshint settings are stored in `.jshintrc`
        jshint: {
          files: ['Gruntfile.js', 'scripts/*.js'],
          options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
          }
        },

        uglify: {
            options: {
                mangle: false,
                // beautify: true,   // Default false.
                preserveComments: 'some'  // https://github.com/gruntjs/grunt-contrib-uglify#preservecomments
            },
            my_target: {
                files: [
                  {
                      src: [
                        //
                        // Only uncomment required js.
                        //
                        // Jquery
                        'bower_components/jquery/jquery.js',
                        'bower_components/jquery-ui/ui/jquery.ui.core.js',
                        // Jquery mobile
                        'js/jquery.mobile.custom.min.js',
                        // Masonry
                        'bower_components/masonry/dist/masonry.pkgd.js',
                        // Bootstrap
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
                        'js/bootstrap_carousel.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
                        'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
                        'js/mpiprototype.js'
                      ],
                      dest: 'static/main.js',
                      nonull: true
                  }
                ]
            }
        },

        copy: {
          main: {
            files: [
              //
              // Copy fontawesome fonts.
              //
              // Will fail silently if source files are missing due to wildcard.

              {
                  expand: true,
                  cwd: 'bower_components/fontawesome/fonts',
                  src: ['*.eot', '*.svg', '*.ttf', '*.woff'],
                  dest: 'static/fontawesome/',
                  filter: 'isFile'
              }
            ]
          }
        },

        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass']
            },
            uglify: {
                files: ['js/mpiprototype.js', 'js/bootstrap_carousel.js'],
                tasks: ['jshint', 'uglify']
            }
        }
    });

    grunt.registerTask('default', [
          'watch'
    ]);

    grunt.registerTask('build', [
        'sass',
        'jshint',
        'uglify',
        'copy'
    ]);
};
