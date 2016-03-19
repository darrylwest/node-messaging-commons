/**
 * Standard Grunt file
 *
 * @author: darryl.west@raincitysoftware.com
 * @created: 2014.08.22 9:30 AM
 */
module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        dirs: {
            lib:'lib',
            test: 'test',
            browser:'browser'
        },
        watch:{
            scripts:{
                files:[
                    'index.js',
                    '<%= dirs.lib %>/*.js',
                    '<%= dirs.lib %>/*/*.js',
                    '<%= dirs.test %>/*.js',
                    '<%= dirs.test %>/*/*.js',
                    '<%= dirs.browser %>/AbstractMessageClient.js'
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
                'index.js',
                '<%= dirs.lib %>/*.js',
                '<%= dirs.lib %>/*/*.js',
                '<%= dirs.test %>/*.js',
                '<%= dirs.test %>/*/*.js',
                '<%= dirs.browser %>/AbstractMessageClient.js'
            ]
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: [
                    '<%= dirs.test %>/*.js',
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
        'jshint'
    ]);

    grunt.registerTask('testAll', [
        'mochaTest'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'mochaTest'
    ]);
};
