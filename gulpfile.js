/*jshint node: true */
"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


/* Sass preprocessor */

gulp.task('sass', function(){
	return gulp.src('source/sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('distribution/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});


/* Watch files for changes */

gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('source/sass/**/*.scss', ['sass']);
	gulp.watch('distribution/*.html', browserSync.reload);
});


/* Browser Sync web server */

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'distribution'
		},
	});
});