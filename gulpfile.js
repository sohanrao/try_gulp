// gulp
var gulp = require('gulp'),
	dist = './public',
	jshint = require('gulp-jshint'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-rimraf'),
    install = require('gulp-install')

// plugins
var connect = require('gulp-connect');


gulp.task('connect', function () {
  connect.server({
    root: 'public/',
    port: 8888
  });
});

var paths = {
	bower: {
        dist: '.bowerrc'.directory || dist + '/bower_components'
    }
}

var tasks = {
	clean: {
		bower: function () {
            return gulp.src(paths.bower.dist)
                .pipe(clean());
        }
	},
    bower: {
        install: function () {
            return gulp.src('./bower.json')
                .pipe(install());
        },
        inject: function () {
            return gulp.src('app/views/index.jade')
                .pipe(jade())
                .pipe(gulp.dest('public'))
        }
    }
}

// Clean out various directories
gulp.task('clean:bower', tasks.clean.bower);
gulp.task('clean', ['clean:bower']);

// Installs Bower dependencies
gulp.task('bower:install', ['clean:bower'], tasks.bower.install);

// Injects Bower's components into our `index.html` file.
gulp.task('bower:inject', ['bower:install'], tasks.bower.inject);

// Runs all build tasks, except javascript minification for debug purposes, change with sourcemaps in the future
gulp.task('build:dev', ['clean','bower:inject']);

// Default task
gulp.task('default', ['build:dev', 'connect']);
