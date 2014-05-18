# grunt-dir2strings

> Flatten a folder to a JSON file represented by path strings

Often, your project will depend your files architecture.

This task combines all those path files into a single .json file. For example if you had a folder that looked like this...

```
patterns
|- templates
    |- homepage.mustache
    |- blog.mustache
|- pages
  |- homepage.mustache
  |- homepage-emergency.mustache
|- organisms
  |- section
    |- latest-posts.mustache
  |- global
    |- header.mustache
  |- article
    |- article-body.mustache
|- molecules
  |- text
    |- byline.mustache
|- atoms
  |- text
    |- headings.mustache
  |- global
    |- colors.mustache
    |- animations.mustache
```

...you would get JSON that looked something like this, except minified:

```js
[
  "atoms",
  "atoms/global",
  "atoms/global/animations.mustache",
  "atoms/global/colors.mustache",
  "atoms/text",
  "atoms/text/headings.mustache",
  "molecules",
  "molecules/text",
  "molecules/text/byline.mustache",
  "organisms",
  "organisms/article",
  "organisms/article/article-body.mustache",
  "organisms/global",
  "organisms/global/header.mustache",
  "organisms/section",
  "organisms/section/latest-posts.mustache",
  "pages",
  "pages/homepage-emergency.mustache",
  "pages/homepage.mustache",
  "templates",
  "templates/blog.mustache",
  "templates/homepage.mustache"
]
```

The result array is alphabetically sorted and clean.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dir2jstrings --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dir2strings');
```

## The "dir2strings" task

### Overview
In your project's Gruntfile, add a section named `dir2strings` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  dir2strings: {
    options: {
      // Task-specific options go here.
    },
    data: {
      // Path for target and destination folders go here
    },
  },
})
```

### Options

#### exclude
Type: `String` or `Array`

A pattern, or array of patterns, of filenames to exclude, e.g. `**/*/notes.md`. Uses the standard globbing syntax. `.DS_Store` and `Thumbs.db` files will **always** be excluded - you don't need to specify these.

### Usage Examples

#### Default Options
This will read the contents of `project/data` and write a JSON file representing its contents to `project/src/data.json`:

```js
grunt.initConfig({
  dir2strings: {
    data: {
      root: 'project/data',
      dest: 'project/src/data.json'
    },
  },
})
```

#### Custom Options
In this (slightly contrived) example, there are two targets - `dev` and `dist`. In both cases .md files will be excluded. In the `dist` target, any files named `debug_hints.json` will also be excluded.

```js
grunt.initConfig({
  dir2strings: {
    options: {
      exclude: '**/*.md'
    },
    dev: {
      root: 'project/data',
      dest: 'project/src/data.json'
    },
    dist: {
      options: {
        exclude: '**/*/debug_hints.json'
      },
      root: 'project/data',
      dest: 'project/src/data.json'
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1.0 - first release
* 0.1.1 - update documentation
