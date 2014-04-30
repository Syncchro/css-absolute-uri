'use strict';

var grunt = require('grunt');
var fs = require('fs');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.css_uri_absolute = {
    setUp: function (done) {

        done();
    },
    slash_end: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/slash_end.css');
        var expected = grunt.file.read('test/expected/slash_end.css');
        test.equal(actual, expected, 'Should parse uris with default option with a slash at end of string');

        test.done();
    },
    default_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default.css');
        var expected = grunt.file.read('test/expected/default.css');
        test.equal(actual, expected, 'Should parse uris in simple css file');

        test.done();
    },
    files_1_and_2: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/file_1_and_2.css');
        var expected = grunt.file.read('test/expected/file_1_and_2.css');
        test.equal(actual, expected, 'Should parse uris with various files');

        test.done();
    },
    ignored: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/ignored.css');
        var expected = grunt.file.read('test/expected/ignored.css');
        test.equal(actual, expected, 'Should parse uris with various files and ignore extension');

        test.done();
    }
};
