/*
 * grunt-dir2strings
 * https://github.com/amoussard/grunt-dir2strings
 *
 * Copyright (c) 2014 Ellipsis team
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    'use strict';

    grunt.registerMultiTask('dir2strings', 'Flatten a folder to a JSON file represented by path strings', function() {

        var options, root, dest, exclusions, path, result, removeExclusions, processFile, processDir, getKey, cleanArray;

        // Task config
        options = this.options({
        });

        root = this.data.root;
        dest = this.data.dest;

        // Exclude .DS_Store, Thumbs.db and any other gubbins specified by the user
        exclusions = [ '**/*/.DS_Store', '**/*/Thumbs.db' ];

        if ( options.exclude ) {
            exclusions = exclusions.concat( options.exclude );
        }

        // Error checking
        if (!root) {
            grunt.log.error( 'You must specify a root folder' );
            return false;
        }

        if (!dest) {
            grunt.log.error( 'You must specify a destination JSON file' );
            return false;
        }

        if (!grunt.file.exists(root) || !grunt.file.isDir(root)) {
            grunt.log.error( 'Specified root folder does not exist' );
            return false;
        }

        // No errors, on with the show
        path = require('path');
        result = [];

        // Get key from path, e.g. 'project/data/config.json' -> 'config'
        getKey = function(filepath, isDir) {
            var key = path.normalize(filepath).split(path.sep).slice(-1)[0];

            if (!isDir && key.lastIndexOf('.') > 0) {
                key = key.substr(0, key.lastIndexOf('.'));
            }

            return key;
        };

        /**
         *
         * @param {string} item File that we want to know if we keep it
         * @returns {boolean}
         */
        removeExclusions = function(item) {
            var i;

            i = exclusions.length;
            while (i--) {
                if (grunt.file.isMatch(exclusions[i], item)) {
                    return false;
                }
            }

            return true;
        };

        /**
         *
         * @param {string} item File that we want to save
         * @param {string} indent Current indentation
         */
        processFile = function(item, indent) {
            // Save file
            result.push(item);
            // Display work
            grunt.log.writeln(indent + getKey(item));
        };

        /**
         * Browse directory and process all this sub elements
         *
         * @param {string} dir Directory that we want to explore
         * @param {string} indent Current indentation
         */
        processDir = function(dir, indent) {
            var contents, item, i;

            // Save directory
            result.push(dir);

            // Display work
            grunt.log.writeln(indent + getKey(dir, true));

            // Get all content of directory
            contents = grunt.file.expand(dir + path.sep + '*').filter(removeExclusions);

            // Loop to manage all nodes
            i = contents.length;
            while (i--) {
                item = contents[i];
                if (grunt.file.isDir(item)) {
                    processDir(item, indent + '  -> ');
                } else {
                    processFile(item, indent + '  -> ');
                }
            }
        };

        /**
         * Sort alphabetically, remove root directory in path
         *
         * @param {Array} aData Data that we want to clean
         * @returns {Array} Cleaned data
         */
        cleanArray = function(aData) {
            var aNewData = [];
            result.sort();
            for (var i in aData) {
                var sElement = aData[i];
                sElement = sElement.replace(root + "/", "").replace(root, "");
                if (sElement) {
                    aNewData.push(sElement);
                }
            }
            return aNewData;
        };

        processDir(root, '');

        if (result === false) {
            return false;
        }

        result = cleanArray(result);

        // Save in dest file
        grunt.log.writeln('Writing file ' + dest);
        grunt.file.write(dest, JSON.stringify(result));

    });

};
