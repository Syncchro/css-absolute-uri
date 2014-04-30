/*
 * grunt-css-uri-absolute
 * https://github.com/mgt/css-uri-absolute
 *
 * Copyright (c) 2014 Marcio Gasparotto
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        css_absolute_uri: {
            default: {
                options: {
                    absoluteUri: 'http://cdn.test.com/images/jquery-ui'
                },
                files: {
                    'tmp/default.css': 'test/fixtures/default_task.css'
                }
            },
            slash_end: {
                options: {
                    absoluteUri: 'http://cdn.test.com/images/jquery-ui/'
                },
                files: {
                    'tmp/slash_end.css': ['test/fixtures/default_task.css']
                }
            },
            various: {
                options: {
                    absoluteUri: 'http://cdn.test.com/images/jquery-ui/'
                },
                files: {
                    'tmp/file_1_and_2.css': ['test/fixtures/file_css_1.css', 'test/fixtures/file_css_2.css']
                }
            },
            ignoring: {
                options: {
                    absoluteUri: 'http://cdn.test.com/images/jquery-ui/',
                    escapeFormats: ['.eot', '.ttf', '.svg', '.woff']
                },
                files: {
                    'tmp/ignored.css': ['test/fixtures/file_css_1.css', 'test/fixtures/file_css_2.css']
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'css_absolute_uri', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
