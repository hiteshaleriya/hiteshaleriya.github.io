module.exports = function(grunt) {

    grunt.initConfig({
        ngAnnotate: {
            options: {
                add: true
            },
            files: {
                expand: true,
                src: [
                    "src/j/app.js"
                ],
                ext: '.js'
            }
        },
        concat: {
            "app": {
                src: [
                    "src/app.module.js",
                    "src/app.route.js",
                    "src/app/shared/**/*.js",
                    "src/app/components/**/*.js"
                ],
                dest: "src/j/app.js",
                nonull: true
            },
            "libs": {
                src: [
                    "src/jass/libs/angular.min.js",
                    "src/jass/libs/angular-route.js"
                ],
                dest: "src/j/libs.js",
                nonull: true
            }
        }
    });

    grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
};
