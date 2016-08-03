module.exports = function (grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            prod: {
                src: 'resources/assets/js/app/init.js',
                dest: 'resources/assets/js/bundle.js'

            },
            dev: {
                src: 'resources/assets/js/app/init.js',
                dest: 'public/js/bundle.js'
            }
        },
        watch: {
            js: {
                files: 'resources/assets/js/**/*.js',
                tasks: 'browserify:dev'
            },
            css: {
                files: 'resources/assets/css/**/*.css',
                tasks: 'concat:dev'
            }
        },
        jst: {
            options: {
                processName: function(filepath) {
                    var name = filepath.split('/');
                    return name[name.length - 1];
                }
            },
            dev: {
                files: {
                    'public/js/templates.js': ['resources/assets/js/app/templates/**/*.tpl']
                }
            },
            prod: {
                'resources/assets/js/templates.js': ['resources/assets/js/app/templates/**/*.tpl']
            }
        },
        concat: {
            prod: {
                src: 'resources/assets/css/*.css',
                dest: 'resources/assets/css/concated/css-concat.css'
            },
            dev:{
                src: 'resources/assets/css/*.css',
                dest: 'public/css/styles-min.css'
            }
        },
        uglify: {
            javascript: {
                src: 'resources/assets/js/bundle.js',
                dest: 'public/js/bundle.js'
            },
            templates: {
                src: 'resources/assets/js/templates.js',
                dest: 'public/js/templates.js'
            }
        },
        cssmin: {
            dist: {
                files: {
                    //этот таск может и конкатинировать все файлы, но раз уж в задании указано использовать concat таск для стилей, 
                    // указывается путь к конкатинированному файлу
                    'public/css/styles-min.css': ['resources/assets/css/concated/css-concat.css']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('dev',['browserify:dev', 'jst:dev', 'concat:dev', 'watch']);
    grunt.registerTask('stage',['browserify:dev', 'jst:dev', 'concat:dev']);
    grunt.registerTask('prod',['browserify:prod', 'jst:prod', 'uglify', 'concat:prod', 'cssmin']);

    grunt.registerTask('default', ['browserify:dev', 'jst:dev', 'concat:dev']);
    grunt.registerTask('w', ['watch']);
};