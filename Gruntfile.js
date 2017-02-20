module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
    grunt.initConfig({
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

};