var gulp = require("gulp");
var gutil = require("gulp-util");
var browserSync = require("browser-sync");
var sass = require("gulp-sass");
var cache = require("gulp-cache");
var rename = require("gulp-rename");
var gulpSequence = require("gulp-sequence");
var zip = require("gulp-zip");

// BROWSER-SYNC
gulp.task("sync", function() {
  browserSync.init("", {
    server: {
      baseDir: "./"
    }
  });
});

// COPY HTML FROM ROOT SRC
gulp.task("copy-html-root", function() {
  return gulp
    .src("../src/**/*.html")
    .pipe(gulp.dest("./versions/sitebase1/"))
    .pipe(gulp.dest("./versions/sitebase2/"));
});

// COPY SASS FROM ROOT SRC
gulp.task("copy-sass-root", function() {
  return gulp
    .src("../src/**/*.scss")
    .pipe(gulp.dest("./"))
    .pipe(gulp.dest("./versions/sitebase2/"));
});

// COPY JS FROM ROOT SRC
gulp.task("copy-js-root", function() {
  return gulp
    .src("../src/**/*.js")
    .pipe(gulp.dest("./"))
    .pipe(gulp.dest("./versions/sitebase1/"))
    .pipe(gulp.dest("./versions/sitebase2/"))
    .pipe(gulp.dest("./examples/productsite/"))
    .pipe(gulp.dest("./examples/singlepageportfolio/"));
});

// COPY IMAGES FROM ROOT SRC
gulp.task("copy-images-root", function() {
  return gulp
    .src("../src/**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(gulp.dest("./"))
    .pipe(gulp.dest("./versions/sitebase1/"))
    .pipe(gulp.dest("./versions/sitebase2/"))
    .pipe(gulp.dest("./examples/productsite/"))
    .pipe(gulp.dest("./examples/singlepageportfolio/"));
});

// SASS ROOT
var sassOptions = {
  outputStyle: "expanded"
};
gulp.task("sass-root", function() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass(sassOptions))
    .pipe(gulp.dest("css/"))
    .pipe(gulp.dest("./versions/sitebase1/css/"))
    .pipe(gulp.dest("./versions/sitebase2/css/"))
    .pipe(gulp.dest("./examples/productsite/css/"))
    .pipe(gulp.dest("./examples/singlepageportfolio/css/"));
});

// SASS LESSON1
gulp.task("sass-lesson1", function() {
  return gulp
    .src("lessons/base-blank.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("lessons/base-blank/"));
});

// SASS LESSON2
gulp.task("sass-lesson2", function() {
  return gulp
    .src("lessons/base-content.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("lessons/base-content/"));
});

// SASS LESSON3
gulp.task("sass-lesson3", function() {
  return gulp
    .src("lessons/base-layout.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("lessons/base-layout/"));
});

// SASS LESSON4
gulp.task("sass-lesson4", function() {
  return gulp
    .src("lessons/base-site.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("lessons/base-site/"));
});

// SASS LESSON5
gulp.task("sass-lesson5", function() {
  return gulp
    .src("lessons/base-site-togglenav.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("lessons/base-site-togglenav/"));
});

// SASS LESSON6
gulp.task("sass-lesson6", function() {
  return gulp
    .src("lessons/base-site-subpage.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("lessons/base-site-subpage/"));
});

// ZIP LESSON1
gulp.task("zip-lesson1", function() {
  return gulp
    .src("lessons/base-blank/**/*")
    .pipe(zip("base-blank.zip"))
    .pipe(gulp.dest("lessons/"));
});

// ZIP LESSON2
gulp.task("zip-lesson2", function() {
  return gulp
    .src("lessons/base-content/**/*")
    .pipe(zip("base-content.zip"))
    .pipe(gulp.dest("lessons/"));
});

// ZIP LESSON3
gulp.task("zip-lesson3", function() {
  return gulp
    .src("lessons/base-layout/**/*")
    .pipe(zip("base-layout.zip"))
    .pipe(gulp.dest("lessons/"));
});

// ZIP LESSON4
gulp.task("zip-lesson4", function() {
  return gulp
    .src("lessons/base-site/**/*")
    .pipe(zip("base-site.zip"))
    .pipe(gulp.dest("lessons/"));
});

// ZIP LESSON5
gulp.task("zip-lesson5", function() {
  return gulp
    .src("lessons/base-site-togglenav/**/*")
    .pipe(zip("base-site-togglenav.zip"))
    .pipe(gulp.dest("lessons/"));
});

// ZIP LESSON6
gulp.task("zip-lesson6", function() {
  return gulp
    .src("lessons/base-site-subpage/**/*")
    .pipe(zip("base-site-subpage.zip"))
    .pipe(gulp.dest("lessons/"));
});

// ZIP VERSION1
gulp.task("zip-version1", function() {
  return gulp
    .src("versions/sitebase1/**/*")
    .pipe(zip("sitebase1.zip"))
    .pipe(gulp.dest("versions/"));
});

// ZIP VERSION1
gulp.task("zip-version2", function() {
  return gulp
    .src("versions/sitebase2/**/*")
    .pipe(zip("sitebase2.zip"))
    .pipe(gulp.dest("versions/"));
});

// ZIP EXAMPLE1
gulp.task("zip-example1", function() {
  return gulp
    .src("examples/productsite/**/*")
    .pipe(zip("productsite.zip"))
    .pipe(gulp.dest("examples/"));
});

// ZIP EXAMPLE2
gulp.task("zip-example2", function() {
  return gulp
    .src("examples/singlepageportfolio/**/*")
    .pipe(zip("singlepageportfolio.zip"))
    .pipe(gulp.dest("examples/"));
});

// BUILD SITE
gulp.task(
  "build",
  gulpSequence(
    ["copy-html-root", "copy-sass-root", "copy-js-root", "copy-images-root"],
    "sass-root",
    [
      "sass-lesson1",
      "sass-lesson2",
      "sass-lesson3",
      "sass-lesson4",
      "sass-lesson5",
      "sass-lesson6"
    ],
    [
      "zip-lesson1",
      "zip-lesson2",
      "zip-lesson3",
      "zip-lesson4",
      "zip-lesson5",
      "zip-lesson6",
      "zip-version1",
      "zip-version2",
      "zip-example1",
      "zip-example2"
    ]
  )
);

// WATCH
gulp.task("watch", ["build", "sync"], function() {
  global.isWatching = true;
  //gulp.watch('../dist/css/style.css', ['build']);
});

gulp.task("default", ["watch"]);
