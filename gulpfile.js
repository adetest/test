const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const sass = require('gulp-ruby-sass');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
    return gulp.src('app/style/*.css')
        .pipe($.cssnano())
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.stream());
})

gulp.task('scripts', ['styles', 'scripts'], () => {
    return gulp.src(['app/js/*.js'])
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
})


gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });

    gulp.watch('app/style/*', ['styles']);

    gulp.watch('app/js/*', ['scripts']);

    gulp.watch("app/index.html").on('change', reload({
        stream: true
    }));
})

gulp.task('default', ['serve'], () => {
    console.log('running!')
})

gulp.task('test', () => {
    return gulp.src('app/style/index.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error',sass.logError))
        .pipe($.cssnano())
        .pipe($.sourcemaps.write('.'))        
        .pipe(gulp.dest('dist/style/'))
})