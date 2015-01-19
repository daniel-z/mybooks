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
          reporter: 'nyan',
          quiet: false,
          clearRequireCache: true
        },
        src: ['specs/*.spec.js'],
      }
    },
    watch: {
      js: {
        options: {
          spawn: false,
        },
        files: ['routes/**/*.js', 'specs/*.spec.js'],
        tasks: ['mochaTest']
      }
    }
  });

  grunt.registerTask('default', ['mochaTest', 'watch']);
};