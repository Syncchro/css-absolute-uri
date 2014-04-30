# grunt-css-absolute-uri

> Very simple replace uris in css files.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-absolute-uri --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-absolute-uri');
```

## The "css_absolute_uri" task

### Overview
In your project's Gruntfile, add a section named `css_absolute_uri` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  css_absolute_uri: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.absoluteUri
Type: `String` **Required**

A string value with your absolute uri.

#### options.escapeFormats
Type: [`String`]
Default value: null

A list of string value that you escape, for example, fonts uris (.eto, woff, etc).

### Usage Examples

#### Default
In this example, all uris from files *file_css_1.css'* and *file_css_2.css* will change to *url("http://cdn.test.com/images/jquery-ui/#####.png")*.

```js
grunt.initConfig({
  css_absolute_uri: {
    options: {
        absoluteUri: 'http://cdn.test.com/images/jquery-ui/'
    },
    files: {
        'tmp/file_1_and_2.css': ['test/fixtures/file_css_1.css', 'test/fixtures/file_css_2.css']
    }
  }
});
```

#### Escape Formats
In this example, uris with *['.eot', '.ttf', '.svg', '.woff']* are ignored, all others will be replaced.

```js
grunt.initConfig({
  css_absolute_uri: {
    options: {
        absoluteUri: 'http://cdn.test.com/images/jquery-ui/',
        escapeFormats: ['.eot', '.ttf', '.svg', '.woff']
    },
    files: {
        'tmp/ignored.css': ['test/fixtures/file_css_1.css', 'test/fixtures/file_css_2.css']
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
