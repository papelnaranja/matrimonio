module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        sass: {
            dist: {
                options: {
                    //style: 'compressed'
                    style: 'expanded'
                },
                files: {
                    // Nuestro Sass es compilado a nuestro archivo CSS
                    'style.css': '_dev/scss/style.scss'

                }
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps

                // or
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'css/maps/' // ...to the specified directory
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: '*.css'
            }
        },

        watch: {
            site: {
                // Vigilamos cualquier cambio en nuestros archivos
                files: ['_dev/scss/**/*.scss', 'css/*.css', '_dev/js/**/*.js', '*.html', 'js/**/*.js', '_dev/pug/**/*.pug'],
                tasks: ['default']
            },
            options: {
                // Instalamos la extensión de Livereload en Chrome para ver cambios
                // automáticos en el navegador sin hacer refresh
                spawn: false,
                livereload: true
            }
        }

    });

    // Cargamos los plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');


    // Registrar tareas
    grunt.registerTask('default', ['sass', 'postcss', 'watch']);



}
