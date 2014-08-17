/**
 *
 *
 * @author: darryl.west@roundpeg.com
 * @created: 12/30/13 9:30 AM
 */
module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        dirs: {
            app:'app',
            test: 'test'
        },
        watch:{
            scripts:{
                files:[
                    '<%= dirs.app %>/*.js',
                    '<%= dirs.app %>/*/*.js',
                    '<%= dirs.test %>/*.js',
                    '<%= dirs.test %>/*/*.js'
                ],
                tasks: [
                    'mochaTest',
                    'jshint'
                ],
                options:{
                    spawn: true
                }
            }
        },
        jshint: {
            options:{
                jshintrc: '.jshintrc',
                verbose: true,
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= dirs.app %>/*.js',
                '<%= dirs.app %>/*/*.js',
                '<%= dirs.test %>/*.js',
                '<%= dirs.test %>/*/*.js',
                '!app/FeedbackConverter.js'
            ]
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: [
                    '<%= dirs.test %>/*/*.js'
                ]
            }
        }
    });

    grunt.registerTask('server', [
        'mochaTest',
        'jshint',
        'watch'
    ]);

    grunt.registerTask('test', [
        'mochaTest',
        'jshint',
        'validate-package'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'mochaTest'
    ]);
};
