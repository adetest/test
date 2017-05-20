const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const styles = require('gulp-clean-css');
const scripts = require('gulp-uglify');

gulp.task('styles', () => {
    gulp.src('style/*.css')
        .pipe(styles())
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.stream());
})

gulp.task('scripts', ['styles', 'scripts'], () => {
    gulp.src(['js/*.js'])
        .pipe(scripts())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
})


gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('style/*', ['styles']);

    gulp.watch('js/*', ['scripts']);

    gulp.watch("index.html").on('change', browserSync.reload);
})

gulp.task('default', ['browser-sync'], () => {
    console.log('running!')
})