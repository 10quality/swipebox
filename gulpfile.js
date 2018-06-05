var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var jsmin = require('gulp-jsmin');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var clean = require('gulp-clean');

// Clean build
gulp.task('clean-css', function () {
    return gulp.src('./dist/css', {force: true})
        .pipe(clean());
});
gulp.task('clean-js', function () {
    return gulp.src('./dist/js', {force: true})
        .pipe(clean());
});

// Prepare
gulp.task('sass', ['clean-css'], function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('script', ['clean-js'], function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('jquery.swipebox.js'))
        .pipe(gulp.dest('./dist/js'));
});

// minify
gulp.task('cssmin', ['sass'], function() {
    return gulp.src('./dist/css/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('jsmin', ['script'], function() {
    return gulp.src('./dist/js/**/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'));
});

/// DEFAULT
gulp.task('default', [
    'cssmin',
    'jsmin',
]);