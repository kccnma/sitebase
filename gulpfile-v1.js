var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');

/*********************
 * Error Handling (ref. https://gist.github.com/noahmiller/61699ad1b0a7cc65ae2d)
 *********************/

global.isWatching = false

// Command line option:
//  --fatal=[warning|error|off]
const ERROR_LEVELS = ['error', 'warning']

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
// ref. http://stackoverflow.com/questions/21602332/catching-gulp-mocha-errors#answers
function handleError(level, error) {
  gutil.log(error.message)
  if (global.isWatching) {
    this.emit('end')
  } else {
    process.exit(1)
  }
}

// Convenience handler for error-level errors.
function onError(error) { return handleError.call(this, 'error', error) }
// Convenience handler for warning-level errors.
function onWarning(error) { return handleError.call(this, 'warning', error) }

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
        .pipe(gulp.dest('docs/css')) // DELETE IF NOT CREATING DOCUMENTATION
        .pipe(browserSync.reload({ stream: true }))
})

// JAVASCRIPT
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(gulp.dest('docs/js/')) // DELETE IF NOT CREATING DOCUMENTATION
        .pipe(browserSync.reload({ stream: true }))
})

// IMAGES
gulp.task('images', function() {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img/'))
        .pipe(gulp.dest('docs/img/')) // DELETE IF NOT CREATING DOCUMENTATION
        .pipe(browserSync.reload({ stream: true }))
})

// BUILD SITE
gulp.task('build', ['sass', 'html', 'js', 'images']) 

// WATCH
gulp.task('watch', ['build', 'sync'], function() {
    global.isWatching = true 
    gulp.watch('src/**/*.html', ['html']); 
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']); 
    gulp.watch('src/img/**/*.+(png|jpg|jpeg|gif|svg)', ['images']); 
})

gulp.task('default', ['watch'])