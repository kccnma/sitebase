var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cache = require('gulp-cache');
var rename = require("gulp-rename");
var gulpSequence = require('gulp-sequence');
var zip = require('gulp-zip');

// BROWSER-SYNC
gulp.task('sync', function() {
    browserSync.init('', {
        server: {
            baseDir: './'
        }
    })
})

// COPY SASS FROM ROOT SRC
gulp.task('copy-sass-root', function() {
    return gulp.src('../src/**/*.scss')
        .pipe(gulp.dest('./'))
})

// COPY JS FROM ROOT SRC
gulp.task('copy-js-root', function() {
    return gulp.src('../src/**/*.js')
        .pipe(gulp.dest('./'))
})

// COPY IMAGES FROM ROOT SRC
gulp.task('copy-images-root', function() {
    return gulp.src('../src/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(gulp.dest('./'))
})


// SASS ROOT
gulp.task('sass-root', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'))
})

// SASS LESSON1
gulp.task('sass-lesson1', function() {
    return gulp.src('lessons/base-blank.scss')
        .pipe(sass())
        .pipe(rename("css/style.css"))
        .pipe(gulp.dest('lessons/base-blank/'))
})

// SASS LESSON2
gulp.task('sass-lesson2', function() {
    return gulp.src('lessons/base-content.scss')
        .pipe(sass())
        .pipe(rename("css/style.css"))
        .pipe(gulp.dest('lessons/base-content/'))
})

// SASS LESSON3
gulp.task('sass-lesson3', function() {
    return gulp.src('lessons/base-layout.scss')
        .pipe(sass())
        .pipe(rename("css/style.css"))
        .pipe(gulp.dest('lessons/base-layout/'))
})

// SASS LESSON4
gulp.task('sass-lesson4', function() {
    return gulp.src('lessons/base-site.scss')
        .pipe(sass())
        .pipe(rename("css/style.css"))
        .pipe(gulp.dest('lessons/base-site/'))
})

// SASS LESSON5
gulp.task('sass-lesson5', function() {
    return gulp.src('lessons/base-site-togglenav.scss')
        .pipe(sass())
        .pipe(rename("css/style.css"))
        .pipe(gulp.dest('lessons/base-site-togglenav/'))
})

// SASS LESSON6
gulp.task('sass-lesson6', function() {
    return gulp.src('lessons/base-site-subpage.scss')
        .pipe(sass())
        .pipe(rename("css/style.css"))
        .pipe(gulp.dest('lessons/base-site-subpage/'))
})

// ZIP LESSON1
gulp.task('zip-lesson1', function() {
    return gulp.src('lessons/base-blank/**/*')
        .pipe(zip('base-blank.zip'))
        .pipe(gulp.dest('lessons/'));
})

// ZIP LESSON2
gulp.task('zip-lesson2', function() {
    return gulp.src('lessons/base-content/**/*')
        .pipe(zip('base-content.zip'))
        .pipe(gulp.dest('lessons/'));
})

// ZIP LESSON3
gulp.task('zip-lesson3', function() {
    return gulp.src('lessons/base-layout/**/*')
        .pipe(zip('base-layout.zip'))
        .pipe(gulp.dest('lessons/'));
})

// ZIP LESSON4
gulp.task('zip-lesson4', function() {
    return gulp.src('lessons/base-site/**/*')
        .pipe(zip('base-site.zip'))
        .pipe(gulp.dest('lessons/'));
})

// ZIP LESSON5
gulp.task('zip-lesson5', function() {
    return gulp.src('lessons/base-site-togglenav/**/*')
        .pipe(zip('base-site-togglenav.zip'))
        .pipe(gulp.dest('lessons/'));
})

// ZIP LESSON6
gulp.task('zip-lesson6', function() {
    return gulp.src('lessons/base-site-subpage/**/*')
        .pipe(zip('base-site-subpage.zip'))
        .pipe(gulp.dest('lessons/'));
})



// BUILD SITE
gulp.task('build', gulpSequence(['copy-sass-root','copy-js-root','copy-images-root'], 'sass-root', ['sass-lesson1', 'sass-lesson2', 'sass-lesson3', 'sass-lesson4', 'sass-lesson5', 'sass-lesson6'],['zip-lesson1', 'zip-lesson2', 'zip-lesson3', 'zip-lesson4', 'zip-lesson5', 'zip-lesson6']))

// WATCH
gulp.task('watch', ['build', 'sync'], function() {
    global.isWatching = true 
    gulp.watch('../dist/css/style.css', ['build']);
})

gulp.task('default', ['watch'])