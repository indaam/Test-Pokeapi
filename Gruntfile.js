module.exports = function (grunt) {

    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
    require("path");
    grunt.loadNpmTasks('grunt-connect-proxy'),
    grunt.loadNpmTasks('grunt-contrib-connect'),
    grunt.loadNpmTasks("grunt-contrib-concat"),
    grunt.loadNpmTasks("grunt-contrib-cssmin"), 
    grunt.loadNpmTasks("grunt-contrib-uglify")

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        /*
        ============ Concat: Merge File
        */
        concat: {
            options: {
                stripBanners: true,
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */\n",
                separator: '\n;',
            },
            all: {
                src: [
                    "<%= pkg.source %>/js/*.js"
                    ],
                dest: "<%= pkg.dist %>/js/all.js"
            }
        },
        /*
        ============ uglify: Minify And beautifuly your codex
        */
        uglify: {
            js_min: {
                options: {
                    banner: '/*\nDeveloper: <%= pkg.author.name %> \nName: <%= pkg.name %>\nVersion: <%= pkg.version %>\nLast Compile: <%= grunt.template.today("yyyy-mm-dd h:MM:ss") %> */\n',
                    compress: {
                        drop_console: true
                    },
                },
                files: [
                    {
                        expand: true,
                        cwd: "<%= pkg.dist %>/js/",
                        src: [ "*", "!*.beautify.js", "!*.min.js", "!*/**" ],
                        dest: "<%= pkg.dist %>/js/",
                        ext: ".min.js"
                    },
                ]
            },
        },
        /*
        ============ cssmin: Minify css
        */
        cssmin: {
            options: {
                banner: '/*\nDeveloper: <%= pkg.author.name %> \nName: <%= pkg.author.name %>\nVersion: <%= pkg.version %>\nLast Compile: <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mediaMerging : true,
                semanticMerging  : true,
                shorthandCompacting  : true
            },
            minify: {
                expand: true,
                cwd: "<%= pkg.source %>/css/",
                // src: [ "*.css", "*.*.css", "!*.min.css" ],
                src: [ "*.css", "!*.min.css" ],
                dest: "<%= pkg.dist %>/css/",
                ext: ".min.css"
            }
        },
        watch: {
            options: {
                livereload: true,
                nospawn: true
            },
            css: {
                files: [ "<%= pkg.source %>/css/*"],
                // files: [ "<%= pkg.dir %>/ori/sass/**/*" ],
                // tasks: [ "compass" ]
                // tasks: [ "newer:compass" ]
            },
            js: {
                files: [ "<%= pkg.source %>/js/**/*" ],
                // tasks: [ "newer:uglify" ]
            },
            html: {
                files: [ "*.html"],
                // tasks: [ "newer:uglify" ]
            },
        },
        connect: {
            server: {
                options: {
                    port: 7878,
                    hostname: 'localhost',
                    keepalive: true,
                    open: false,
                    middleware: function (connect, options) {
                        return [proxySnippet];
                    }
                },
                proxies: [{
                    context: '/api',
                    host: 'pokeapi.salestock.net',
                    port: 8000
                }]
            }
        }
    });

    grunt.registerTask('proxy', [
        'configureProxies:server',
        'connect:server']);

    grunt.registerTask("c",                 [ "concat" ]);
    grunt.registerTask("u",                 [ "uglify" ]);
    grunt.registerTask("csort",             [ "css_mqpacker" ]);
    grunt.registerTask("cmin",              [ "cssmin" ]);
    grunt.registerTask("w",                 [ "watch" ]);
    grunt.registerTask("build",             [ "c", "u", "cmin" ]);

};