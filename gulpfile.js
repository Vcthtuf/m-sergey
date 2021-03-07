'use strict';
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const pug = require('gulp-pug');

gulp.task('server', function () {

    browserSync({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("dist").on('change', browserSync.reload);
});

gulp.task('pug', function buildHTML() {
    return gulp.src("src/*.pug")
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task('styles', function () {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*.pug", gulp.parallel('pug'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'pug', 'styles'));