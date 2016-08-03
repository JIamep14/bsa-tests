module.exports = function (grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            app: {
                src: 'resources/assets/js/app/init.js',
                dest: 'public/bundle.js'

            }
        },
        watch: {
            js: {
                files: 'resources/assets/js/**/*.js',
                tasks: 'browserify'
            }
        },
        jst: {
            compile: {
                options: {
                    processName: function(filepath) {
                        var name = filepath.split('/');
                        return name[name.length - 1];
                    }
                },
                files: {
                    'public/templates.js': ['resources/assets/js/app/templates/**/*.tpl']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jst');

    grunt.registerTask('default', ['browserify', 'jst']);
    grunt.registerTask('w', ['watch']);
};