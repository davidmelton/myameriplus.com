/*jshint node: true */
"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var browserSync = require('browser-sync').create();


/* Sass preprocessor */

gulp.task('sass', function(){
	return gulp.src('source/sass/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('distribution/css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('distribution/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});


/* HTML template processor */

gulp.task('html', function(){
    return gulp.src('source/pages/*.html')
        .pipe(handlebars({}, {
            ignorePartials: true,
            batch: ['source/partials']
        }))
        .pipe(gulp.dest('distribution'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


/* Browser Sync web server */

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'distribution'
		},
	});
});


/* Watch files for changes */

gulp.task('watch', ['browserSync', 'sass', 'html'], function(){
	gulp.watch('source/sass/**/*.scss', ['sass']);
    gulp.watch('source/**/*.html', ['html']);
});


/* Default task runner */

gulp.task('default', ['watch']);