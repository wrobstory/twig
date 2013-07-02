module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    meta: {
      pkg: grunt.file.readJSON("package.json"),
      srcFiles: [
        "src/twig.js"
      ]
    },
    watch: {
      scripts: {
        files: ["src/**/*.js"],
        tasks: ["jshint"]
      }
    },
    jshint: {
      options: {
        curly: true,
        undef: true
      },
      grunt: {
        options: {
          node: true
        },
        files: {
          src: ["Gruntfile.js"]
        }
      }
    },
    concat: {
      options: {
        banner: "/*! <%= meta.pkg.name %> - v<%= meta.pkg.version %>\n" +
          " *  License: <%= meta.pkg.license %>\n" +
          " *  Date: <%= grunt.template.today('yyyy-mm-dd') %>\n" +
          " */\n"
      },
      dist: {
        files: {
          "dist/twig.js": "<%= meta.srcFiles %>"
        }
      },
      release: {
        files: {
          "twig.js": "<%= meta.srcFiles %>"
        }
      }
    },
    uglify: {
      options: {
        // Preserve banner
        preserveComments: "some"
      },
      dist: {
        files: {
          "dist/twig.min.js": "dist/twig.js"
        }
      },
      release: {
        files: {
          "twig.min.js": "dist/twig.js"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["jshint", "concat:dist", "uglify:dist"]);
  grunt.registerTask("release", ["jshint", "concat", "uglify"]);
};
