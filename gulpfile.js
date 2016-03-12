'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const streamify = require('gulp-streamify');

const argv = require('yargs').argv;
const gulpif = require('gulp-if');

gulp.task('scripts', () => {
    return browserify({entries: './src/js/index.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('index.js'))
        // .pipe(streamify(uglify())) // minify!
        .pipe(gulpif(argv.prod, streamify(uglify())))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', () => {
    return gulp.src('./src/sass/**/*')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', function(error){
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('watch', ['styles', 'scripts'], () => {
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles']);

// gulp --prod
