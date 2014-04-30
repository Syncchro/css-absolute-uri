/*
 * grunt-css-absolute-uri
 * https://github.com/Syncchro/css-absolute-uri
 *
 * Copyright (c) 2014 Synchro
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var fs = require('fs'),
        path = require('path'),
        chalk = require('chalk');

    var URI_RE = /(?:url\(["']?)(.*?)(?:["']?\))/igm,
        ESCAPE_PATH = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

    grunt.registerMultiTask('css_absolute_uri', 'A simple grunt plugin for replace uri in css docs.', function () {

        var options = this.options({});

        if (!options.absoluteUri) {
            grunt.log.warn(chalk.red('[!]') + " [absolute uri is not defined]");
            return false;
        }

        this.files.forEach(function (file) {
            var validFiles = file.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
                    return false;
                } else {
                    return true;
                }
            });

            var newFileContent = validFiles.map(function(file) {
                return processFile(file, options.absoluteUri, options.escapeFormats);
            }).join('\n');

            grunt.file.write(file.dest, newFileContent);
        });
    });

    var processFile = function (filePath, absoluteUri, escapeFormats) {
        var fileContent = fs.readFileSync(filePath, { "encoding": "utf8" }),
            newFileContent = fileContent.slice(0),
            uris = processCssUri(newFileContent, escapeFormats);

        uris.forEach(function (fileUri) {
            var uriParts = fileUri.split('/'),
                filePattern = fileUri.replace(ESCAPE_PATH, "\\$&"),
                file = uriParts[uriParts.length - 1].replace(/url/gim, '').replace(/[()'"]*/gim, ''),
                newFilePath = defineNewUri(absoluteUri, file);

            newFileContent = newFileContent.replace(new RegExp(filePattern, 'gim'), newFilePath);
        });
        return newFileContent;
    };

    var defineNewUri = function (absoluteUri, file) {
        var conector = '/';

        if (absoluteUri.slice(-1) === '/') {
            conector = '';
        }
        return 'url("' + absoluteUri + conector + file + '")';
    };

    var processCssUri = function (fileContent, escapeFormats) {
        var uriMatches = fileContent.match(URI_RE);

        if (uriMatches.length > 0) {
            if(Boolean(escapeFormats)) {
                return removeEscapeFormats(uriMatches, escapeFormats);
            } else {
                return uriMatches;
            }
        }
        return [];
    };

    var removeEscapeFormats = function(uriMatches, escapeFormats) {
        function filterIgnoreds(element, index) {
            escapeFormats.forEach(function(format){
                if(element.indexOf(format) > -1) {
                    uriMatches = uriMatches.splice(index, 1);
                }
            });
        }
        uriMatches.forEach(filterIgnoreds);

        return uriMatches;
    };
};
