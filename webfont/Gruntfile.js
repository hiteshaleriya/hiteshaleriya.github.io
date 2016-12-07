/**
 * Author : Hitesh Aleriya
 * Version : base
 * Desc : Grunt file
 */

module.exports = function(grunt) {

    grunt.initConfig({
        webfont: {
            icons: {
                src: 'svg/*.svg',
                dest: 'fonts1',
                options: {
                    //ligatures: true
                }
            }
        }
    });

    grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
};
