const gulp = require("gulp");
const { parallel, series } = require("gulp");

const { minify } = require('html-minifier-terser');
const sass = require('gulp-sass')(require('sass'));
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create(); //https://browsersync.io/docs/gulp
// gulp-autoprefixer v10 is ESM-only; load it dynamically at runtime so this CommonJS gulpfile remains compatible.
let autoprefixer;
async function getAutoprefixer() {
  if (autoprefixer) return autoprefixer;
  const mod = await import('gulp-autoprefixer');
  autoprefixer = mod.default || mod;
  return autoprefixer;
}
const babel = require('gulp-babel');
const rename = require("gulp-rename");
// gulp-zip v6 is ESM-only; load it dynamically so this CommonJS gulpfile continues to work.
let zip;
async function getZip() {
  if (zip) return zip;
  const mod = await import('gulp-zip');
  zip = mod.default || mod;
  return zip;
}

// /*
// TOP LEVEL FUNCTIONS
//     gulp.task = Define tasks
//     gulp.src = Point to files to use
//     gulp.dest = Points to the folder to output
//     gulp.watch = Watch files and folders for changes
// */


// HTML
function html(cb) {
  return gulp.src("src/**/*.html")
    .pipe(gulp.dest("dist"))
    // minify using html-minifier-terser
    .pipe(require('through2').obj(async function (file, _, next) {
      if (file.isBuffer()) {
        try {
          const content = file.contents.toString();
          const minified = await minify(content, { collapseWhitespace: true, removeComments: true });
          file.contents = Buffer.from(minified);
        } catch (err) {
          return next(err);
        }
      }
      this.push(file);
      next();
    }))
    .pipe(gulp.dest("dist"));
}

// SCSS
async function css() {
  const ap = await getAutoprefixer();
  return gulp.src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(ap({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("dist/css"))
    // Stream changes to all browsers
    .pipe(browserSync.stream());
}

// JS
function js(cb) {
  gulp.src("src/js/**/*.js")
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat("script.js"))
    // .pipe(uglify())  // TO MINIMIZE
    .pipe(gulp.dest("dist/js"));
  cb();
}

// IMAGES - simple copy (removed binary-based optimizers for security/reliability)
function imageMin() {
  return gulp.src("src/img/**/*", { encoding: false })
    .pipe(gulp.dest("dist/img"));
}

// WATCH
function watch_files() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  gulp.watch("src/*.html", html).on("change", browserSync.reload);
  gulp.watch("src/scss/**/*.scss", css);
  gulp.watch("src/js/*.js", js).on("change", browserSync.reload);
  gulp.watch("src/**/*.+(png|jpg|jpeg|gif|svg)", imageMin).on("change", browserSync.reload);
}

// Default 'gulp' command with start local server and watch files for changes.
exports.default = series(html, css, js, imageMin, watch_files);

// 'gulp build' will build all assets but not run on a local server.
exports.build = parallel(html, css, js, imageMin);

//
//
// ******* END STANDARD SiteBase GULP CONFIG *******
//
//





// *****************************************
// *****************************************
//
// ********** BEGIN BUILD DOCS *************
//
// *****************************************
// *****************************************


// COPY HTML FROM ROOT SRC
function copyhtmlroot(cb) {
  gulp.src("src/**/*.html")
    .pipe(gulp.dest("docs/variations/sitebase1/"))
    .pipe(gulp.dest("docs/variations/sitebase2/"));
  cb();
}

// COPY SASS FROM ROOT SRC
function copysassroot(cb) {
  gulp.src("src/**/*.scss")
    .pipe(gulp.dest("docs/"))
    .pipe(gulp.dest("docs/variations/sitebase2/"));
  cb();
}

// COPY JS FROM ROOT SRC
function copyjsroot(cb) {
  gulp.src("src/**/*.js")
    .pipe(gulp.dest("docs/"))
    .pipe(gulp.dest("docs/variations/sitebase1/"))
    .pipe(gulp.dest("docs/variations/sitebase2/"))
    .pipe(gulp.dest("docs/examples/productsite/"))
    // .pipe(gulp.dest("docs/examples/sitename-singlepagesite/"))
    .pipe(gulp.dest("docs/examples/singlepageportfolio/"));
  cb();
}

// COPY IMAGES FROM ROOT SRC
function copyimagesroot(cb) {
  gulp.src("src/**/*.+(png|jpg|jpeg|gif|svg)", { encoding: false })
    .pipe(gulp.dest("docs/"))
    .pipe(gulp.dest("docs/variations/sitebase1/"))
    .pipe(gulp.dest("docs/variations/sitebase2/"))
    .pipe(gulp.dest("docs/examples/productsite/"))
    .pipe(gulp.dest("docs/examples/sitename-singlepagesite/"))
    .pipe(gulp.dest("docs/examples/singlepageportfolio/"));
  cb();
}

// SASS ROOT
const sassOptions = {
  outputStyle: "expanded"
};
function sassroot(cb) {
  gulp.src("src/scss/**/*.scss")
    .pipe(sass(sassOptions))
    .pipe(gulp.dest("docs/css/"))
    .pipe(gulp.dest("docs/variations/sitebase1/css/"))
    .pipe(gulp.dest("docs/variations/sitebase2/css/"))
    .pipe(gulp.dest("docs/examples/productsite/css/"))
    .pipe(gulp.dest("docs/examples/sitename-singlepagesite/css/"))
    .pipe(gulp.dest("docs/examples/singlepageportfolio/css/"));
  cb();
}
// SASS LESSON1
// function loremipsum(cb) {
//   gulp.src("src/lorem/**/*.scss")
//     .pipe(gulp.dest("docs/"))
//     .pipe(gulp.dest("docs/"));
//   cb();
// }

// SASS LESSON1
function sasslesson1(cb) {
  gulp.src("docs/lessons/base-blank.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("docs/lessons/base-blank/"));
  cb();
}

// SASS LESSON2
function sasslesson2(cb) {
  gulp.src("docs/lessons/base-content.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("docs/lessons/base-content/"));
  cb();
}

// SASS LESSON3
function sasslesson3(cb) {
  gulp.src("docs/lessons/base-layout.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("docs/lessons/base-layout/"));
  cb();
}

// SASS LESSON4
function sasslesson4(cb) {
  gulp.src("docs/lessons/base-site.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("docs/lessons/base-site/"));
  cb();
}

// SASS LESSON5
function sasslesson5(cb) {
  gulp.src("docs/lessons/base-site-togglenav.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("docs/lessons/base-site-togglenav/"));
  cb();
}

// SASS LESSON6
function sasslesson6(cb) {
  gulp.src("docs/lessons/base-site-subpage.scss")
    .pipe(sass(sassOptions))
    .pipe(rename("css/style.css"))
    .pipe(gulp.dest("docs/lessons/base-site-subpage/"));
  cb();
}


// ZIP LESSON1
async function ziplesson1() {
  const z = await getZip();
  return gulp.src("docs/lessons/base-blank/**/*")
    .pipe(z("base-blank.zip"))
    .pipe(gulp.dest("docs/lessons/"));
}

// ZIP LESSON2
async function ziplesson2() {
  const z = await getZip();
  return gulp.src("docs/lessons/base-content/**/*")
    .pipe(z("base-content.zip"))
    .pipe(gulp.dest("docs/lessons/"));
}

// ZIP LESSON3
async function ziplesson3() {
  const z = await getZip();
  return gulp.src("docs/lessons/base-layout/**/*")
    .pipe(z("base-layout.zip"))
    .pipe(gulp.dest("docs/lessons/"));
}

// ZIP LESSON4
async function ziplesson4() {
  const z = await getZip();
  return gulp.src("docs/lessons/base-site/**/*")
    .pipe(z("base-site.zip"))
    .pipe(gulp.dest("docs/lessons/"));
}

// ZIP LESSON5
async function ziplesson5() {
  const z = await getZip();
  return gulp.src("docs/lessons/base-site-togglenav/**/*")
    .pipe(z("base-site-togglenav.zip"))
    .pipe(gulp.dest("docs/lessons/"));
}

// ZIP LESSON6
async function ziplesson6() {
  const z = await getZip();
  return gulp.src("docs/lessons/base-site-subpage/**/*")
    .pipe(z("base-site-subpage.zip"))
    .pipe(gulp.dest("docs/lessons/"));
}

// ZIP VERSION1
async function zipvariation1() {
  const z = await getZip();
  return gulp.src("docs/variations/sitebase1/**/*")
    .pipe(z("sitebase1.zip"))
    .pipe(gulp.dest("docs/variations/"));
}

// ZIP VARIATION2
async function zipvariation2() {
  const z = await getZip();
  return gulp.src("docs/variations/sitebase2/**/*")
    .pipe(z("sitebase2.zip"))
    .pipe(gulp.dest("docs/variations/"));
}

// ZIP EXAMPLE1
async function zipexample1() {
  const z = await getZip();
  return gulp.src("docs/examples/productsite/**/*")
    .pipe(z("productsite.zip"))
    .pipe(gulp.dest("docs/examples/"));
}

// ZIP EXAMPLE2
async function zipexample2() {
  const z = await getZip();
  return gulp.src("docs/examples/singlepageportfolio/**/*")
    .pipe(z("singlepageportfolio.zip"))
    .pipe(gulp.dest("docs/examples/"));
}

// ZIP EXAMPLE3
async function zipexample3() {
  const z = await getZip();
  return gulp.src("docs/examples/sitename-singlepagesite/**/*")
    .pipe(z("sitename-singlepagesite.zip"))
    .pipe(gulp.dest("docs/examples/"));
}

// WATCH DOCS
const doc_series = [html, css, js, imageMin, copyhtmlroot, copysassroot, copyjsroot, copyimagesroot, sassroot, sasslesson1, sasslesson2, sasslesson3, sasslesson4, sasslesson5, sasslesson6, ziplesson1, ziplesson2, ziplesson3, ziplesson4, ziplesson5, ziplesson6, zipvariation1, zipvariation2, zipexample1, zipexample2, zipexample3];

function watch_docs() {
  browserSync.init({
    server: {
      baseDir: "./docs/"
    }
  });
  gulp.watch("src/*.html", series(doc_series)).on("change", browserSync.reload);
  gulp.watch("src/scss/**/*.scss", series(doc_series));
  gulp.watch("src/js/*.js", series(doc_series)).on("change", browserSync.reload);
  gulp.watch("src/**/*.+(png|jpg|jpeg|gif|svg)", series(doc_series)).on("change", browserSync.reload);
  gulp.watch("docs/*.html", series(doc_series)).on("change", browserSync.reload);
}


exports.docs = series(doc_series, watch_docs);

//
// END BUILD DOCS
//

