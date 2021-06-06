module.exports = (grunt) => {
  grunt.initConfig({
    concurrent: {
      dev: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    nodemon: {
      run: {
        script: 'server/run.js',
        options: {
          watch: ['server'],
          delay: 300
        }
      }
    },

    browserify: {
      dist: {
        files: {
          'dist/code-sync.js': ['client/code-sync/code-sync.js'],
          'dist/main.js': ['client/main.js']
        }
      }
    },

    watch: {
      server: {
        files: ['client/**/*.js'],
        tasks: ['browserify'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'browserify',
    'concurrent'
  ]);
};
