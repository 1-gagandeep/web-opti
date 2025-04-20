const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Minify HTML in root folder
gulp.task('minify-html', () => {
  return gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Minify and move CSS from ./css/
gulp.task('minify-css', () => {
  return gulp.src('./css/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

// Minify and move JS from ./js/
gulp.task('minify-js', () => {
  return gulp.src('./js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Default task
gulp.task('default', gulp.parallel('minify-html', 'minify-css', 'minify-js'));
