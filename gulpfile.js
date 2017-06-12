var gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    livereload = require('gulp-livereload');

gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('css', function () {
    gulp.src('./static/styles/*.less')
        .pipe(less({style: 'compressed'}).on('error', gutil.log))
        .pipe(autoprefix('last 10 version'))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./static/styles/'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(connect.reload());
});

gulp.task('js', function() {
   gulp.src([
       './node_modules/angular/angular.min.js',
       './static/scripts/dev/**/*.js',
       './static/scripts/dev/*.js'
   ])
       .pipe(sourcemaps.init())
       .pipe(concat('main.js'))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('./static/scripts/'))
});

gulp.task('watch', function () {
    gulp.watch('./static/styles/blocks/**/*.less', ['css']);
    gulp.watch('./static/scripts/dev/**/*.js', ['js']);
    gulp.watch('./index.html', ['html']);
});

gulp.task('default', ['connect', 'css', 'js', 'html', 'watch']);