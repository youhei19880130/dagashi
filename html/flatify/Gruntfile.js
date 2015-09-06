"use strict";
var LIVERELOAD_PORT, lrSnippet, mountFolder;

LIVERELOAD_PORT = 35728;

lrSnippet = require("connect-livereload")({
  port: LIVERELOAD_PORT
});

mountFolder = function(connect, dir) {
  return connect["static"](require("path").resolve(dir));
};

module.exports = function(grunt) {
  var yeomanConfig;
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  yeomanConfig = {
    app: "client",
    dist: "dist",
    docs: "documentation"
  };
  try {
    yeomanConfig.app = require("./bower.json").appPath || yeomanConfig.app;
  } catch (_error) {}
  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      compass: {
        files: ["<%= yeoman.app %>/styles/**/*.{scss,sass}"],
        tasks: ["compass:server"]
      },
      less: {
        files: ["<%= yeoman.app %>/styles-less/**/*.less"],
        tasks: ["less:server"]
      },
      jade: {
        files: ["<%= yeoman.docs %>/jade/*.jade"],
        tasks: ["jade:docs"]
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          "<%= yeoman.app %>/index.html",
          "<%= yeoman.app %>/app/**/*.html",
          "<%= yeoman.app %>/app/**/*.js",
          "<%= yeoman.app %>/styles/**/*.scss",
          "<%= yeoman.app %>/styles-less/**/*.less",
          ".tmp/styles/**/*.css",
          "<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}",
          "<%= yeoman.docs %>/jade/*.jade"
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: "localhost"
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [lrSnippet, mountFolder(connect, ".tmp"), mountFolder(connect, yeomanConfig.app)];
          }
        }
      },
      docs: {
        options: {
          middleware: function(connect) {
            return [lrSnippet, mountFolder(connect, yeomanConfig.docs)];
          }
        }
      },
      test: {
        options: {
          middleware: function(connect) {
            return [mountFolder(connect, ".tmp"), mountFolder(connect, "test")];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect) {
            return [mountFolder(connect, yeomanConfig.dist)];
          }
        }
      }
    },
    open: {
      server: {
        url: "http://localhost:<%= connect.options.port %>"
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [".tmp", "<%= yeoman.dist %>/*", "!<%= yeoman.dist %>/.git*"]
          }
        ]
      },
      all: [".tmp", ".sass-cache", "readme.md", "client/bower_components", "documentation/jade", "documentation/config.codekit", "landing/jade", "landing/config.codekit", "node_modules", ".git"],
      server: ".tmp"
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["Gruntfile.js", "<%= yeoman.app %>/scripts/**/*.js"]
    },
    injector: {
      options: {
        relative: true
      },
      local_dependencies: {
        files: {
          "<%= yeoman.app %>/index.html": [
            "<%= yeoman.app %>/app/**/*.module.js",
            "<%= yeoman.app %>/app/**/*.js",
            "!" + "<%= yeoman.app %>/**/*.spec.js"
          ]
        }
      },
    },
    jade: {
      docs: {
        options: {
          pretty: true
        },
        files: {
          "<%= yeoman.docs %>/index.html": ["<%= yeoman.docs %>/jade/index.jade"]
        }
      }
    },
    compass: {
      options: {
        sassDir: "<%= yeoman.app %>/styles",
        cssDir: ".tmp/styles",
        generatedImagesDir: ".tmp/styles/ui/images/",
        imagesDir: "<%= yeoman.app %>/styles/ui/images/",
        javascriptsDir: "<%= yeoman.app %>/scripts",
        fontsDir: "<%= yeoman.app %>/fonts",
        importPath: "<%= yeoman.app %>/bower_components",
        httpImagesPath: "styles/ui/images/",
        httpGeneratedImagesPath: "styles/ui/images/",
        httpFontsPath: "fonts",
        relativeAssets: true
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          debugInfo: false,
          noLineComments: true
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      },
      forvalidation: {
        options: {
          debugInfo: false,
          noLineComments: false
        }
      }
    },
    less: {
      server: {
        options: {
          strictMath: true,
          dumpLineNumbers: true,
          sourceMap: true,
          sourceMapRootpath: "",
          outputSourceFiles: true
        },
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>/styles-less",
            src: "main.less",
            dest: ".tmp/styles",
            ext: ".css"
          }
        ]
      },
      dist: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>/styles-less",
            src: "main.less",
            dest: ".tmp/styles",
            ext: ".css"
          }
        ]
      }
    },
    useminPrepare: {
      html: "<%= yeoman.app %>/index.html",
      options: {
        dest: "<%= yeoman.dist %>",
        flow: {
          steps: {
            js: ["concat"],
            css: ["cssmin"]
          },
          post: []
        }
      }
    },
    usemin: {
      html: ["<%= yeoman.dist %>/**/*.html", "!<%= yeoman.dist %>/bower_components/**"],
      css: ["<%= yeoman.dist %>/styles/**/*.css"],
      options: {
        dirs: ["<%= yeoman.dist %>"]
      }
    },
    htmlmin: {
      dist: {
        options: {},
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>",
            src: ["*.html", "views/*.html"],
            dest: "<%= yeoman.dist %>"
          }
        ]
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "<%= yeoman.app %>",
            dest: "<%= yeoman.dist %>",
            src: [
              "favicon.ico",
              "bower_components/font-awesome/css/*",
              "bower_components/font-awesome/fonts/*",
              "bower_components/weather-icons/css/*",
              "bower_components/weather-icons/fonts/*",
              "bower_components/weather-icons/font/*",
              "fonts/**/*",
              "i18n/**/*",
              "images/**/*",
              "styles/fonts/**/*",
              "styles/img/**/*",
              "styles/ui/images/*",
              "app/**/*.html"
            ]
          }, {
            expand: true,
            cwd: ".tmp",
            dest: "<%= yeoman.dist %>",
            src: ["styles/**", "assets/**"]
          }, {
            expand: true,
            cwd: ".tmp/images",
            dest: "<%= yeoman.dist %>/images",
            src: ["generated/*"]
          }
        ]
      },
      styles: {
        expand: true,
        cwd: "<%= yeoman.app %>/styles",
        dest: ".tmp/styles/",
        src: "**/*.css"
      }
    },
    concurrent: {
      server: ["compass:server", "copy:styles"],
      dist: ["compass:dist", "copy:styles", "htmlmin"],
      lessServer: ["less:server", "copy:styles"],
      lessDist: ["less:dist", "copy:styles", "htmlmin"]
    },
    cssmin: {
      options: {
        keepSpecialComments: '0'
      },
      dist: {}
    },
    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed
      },
      dist: {}
    },
    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
          "<%= yeoman.dist %>/scripts/app.js": [".tmp/**/*.js", "<%= yeoman.app %>/scripts/**/*.js", "!<%= yeoman.app %>/scripts/vendors/**"]
        }
      }
    }
  });
  grunt.registerTask("docs", function() {
    return grunt.task.run(["jade:docs", "connect:docs", "open", "watch"]);
  });
  grunt.registerTask("server", function(target) {
    if (target === "dist") {
      return grunt.task.run(["serve:dist"]);
    }
    return grunt.task.run(["serve"]);
  });
  grunt.registerTask("serve", function(target) {
    if (target === "dist") {
      return grunt.task.run(["build", "open", "connect:dist:keepalive"]);
    }
    return grunt.task.run(["clean:server", "concurrent:server", "connect:livereload", "open", "watch"]);
  });
  grunt.registerTask("build", ["clean:dist", "useminPrepare", "concurrent:dist", "copy:dist", "cssmin", "concat", "uglify", "usemin"]);
  return grunt.registerTask("default", ["serve"]);
};
