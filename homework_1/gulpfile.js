'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


/* JavaScript */
gulp.task('scripts', function(){
	return gulp.src([
		'./app/js/main.js'
		])
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});


// Static server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

/* Global main tasks */
// Development mode without watching
gulp.task('default', gulp.series('scripts', 'browser-sync'));
