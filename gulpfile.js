const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const sass = require('gulp-ruby-sass');
const del = require('del')

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
    return gulp.src('app/style/index.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', sass.logError))
        .pipe($.autoprefixer())
        .pipe($.cssnano())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/style/'))
        .pipe(reload({
            stream: true
        }));
})

gulp.task('scripts', () => {
    return gulp.src(['app/js/*.js'])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['env']
        }))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({
            stream: true
        }));
})

gulp.task('images', () => {
    return gulp.src('app/images/*.jpg')
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({
            stream: true
        }))
})

gulp.task('html', () => {
    return gulp.src('app/index.html')
        .pipe($.imagemin())
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
})


gulp.task('serve',['del','styles','images','scripts','html'], () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'dist/'
        }
    });

    gulp.watch('app/style/*', ['styles']);
    gulp.watch('app/js/*', ['scripts']);
    gulp.watch('app/images/*',['images'])
    gulp.watch('app/index.html', ['html'])
})

gulp.task('default', ['serve'], () => {
    console.log('running!')
})

gulp.task('clean',del.bind(null,['dist']));