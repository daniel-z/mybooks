// Gruntfile.js
module.exports = function(grunt) {
  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['specs/*.spec.js'],
      }
    },
    watch: {
      js: {
        options: {
          spawn: false,
        },
        files: 'routes/*.js',
        files: 'specs/*.spec.js',
        tasks: ['default']
      }
    }
  });

  grunt.registerTask('default', ['mochaTest', 'watch']);
};