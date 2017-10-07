var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');

// BROWSER-SYNC
gulp.task('sync', function() {
    browserSync.init('', {
        server: {
            baseDir: './dist/'
        }
    })
})

// HTML
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({ stream: true }))
})

// SASS
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }))
})

// JAVASCRIPT
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({ stream: true }))
})

// IMAGES
gulp.task('images', function() {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img/'))
        .pipe(browserSync.reload({ stream: true }))
})

// BUILD SITE
gulp.task('build', ['html', 'sass', 'js', 'images']) 

// WATCH
gulp.task('watch', ['build', 'sync'], function() {
    global.isWatching = true 
    gulp.watch('src/**/*.html', ['html']); 
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']); 
    gulp.watch('src/img/**/*.+(png|jpg|jpeg|gif|svg)', ['images']); 
})

gulp.task('default', ['watch'])