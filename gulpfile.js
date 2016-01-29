'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

gulp.task('scripts', function () {
    var b = browserify({
        entries: './src/js/index.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('styles', function() {
    return gulp.src('./src/sass/**/*')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', function(error){
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./dist/styles'));
});


gulp.task('watch', ['styles'], function() {
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
