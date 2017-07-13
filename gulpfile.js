var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
})

// HTML
gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
})

// IMAGES
gulp.task('images', () => {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img/'))
})

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['sass']); 
    gulp.watch('src/**/*.html', ['html']); 
    gulp.watch('src/img/**/*', ['images']); 
})