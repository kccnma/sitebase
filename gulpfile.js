import { src, dest, watch, series, parallel } from 'gulp';
import { minify as htmlMinify } from 'html-minifier-terser';
import through2 from 'through2';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
const sass = gulpSass(sassCompiler);
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import browserSyncPkg from 'browser-sync';
const browserSync = browserSyncPkg.create(); //https://browsersync.io/docs/gulp
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import zip from 'gulp-zip';
import path from 'path';
import fs from 'fs/promises';
import { finished } from 'stream';

// /*
// TOP LEVEL FUNCTIONS
//     gulp.task = Define tasks
//     gulp.src = Point to files to use
//     gulp.dest = Points to the folder to output
//     gulp.watch = Watch files and folders for changes
// */


// HTML
function html() {
  // Copy HTML, then minify using html-minifier-terser in a stream transform
  return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(
      through2.obj(async function (file, _, cb) {
        if (file.isBuffer()) {
          try {
            const min = await htmlMinify(file.contents.toString(), {
              collapseWhitespace: false,
              removeComments: true,
              minifyJS: true,
              minifyCSS: true
            });
            file.contents = Buffer.from(min);
            this.push(file);
            cb();
          } catch (err) {
            cb(err);
          }
        } else {
          this.push(file);
          cb();
        }
      })
    )
    .pipe(dest('dist'));
}

// SCSS
function css() {
  return src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({
      // overrideBrowserslist: ['last 1 version', '> 1%', 'IE 10'],
      cascade: false
    }))
    .pipe(dest('dist/css'))
    // Stream changes to all browsers
    .pipe(browserSync.stream());
}

// JS
function js() {
  return src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('script.js'))
    // .pipe(uglify())  // TO MINIMIZE
    .pipe(dest('dist/js'));
}

// IMAGES

function imageMin() {
  // Copy images from src -> dist preserving directory structure
  return src('src/**/*.+(png|jpg|jpeg|gif|svg|webp|avif)', { allowEmpty: true, encoding: false, base: 'src' })
    .pipe(dest('dist'));
}

// Quick copy-only pipeline for watch (fast iteration)
function imageMinWatch() {
  return src('src/**/*.+(png|jpg|jpeg|gif|svg|webp|avif)', { allowEmpty: true, encoding: false, base: 'src' })
    .pipe(dest('dist'));
}

// WATCH
function watch_files() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  const w1 = watch('index.html', html).on('change', browserSync.reload);
  watch('src/*.html', html).on('change', browserSync.reload);
  watch('src/scss/**/*.scss', css);
  watch('src/js/*.js', js).on('change', browserSync.reload);
  watch('src/**/*.+(png|jpg|jpeg|gif|svg|webp|avif)', imageMinWatch).on('change', browserSync.reload);
  watch('docs/*.html', html).on('change', browserSync.reload);

  return w1; // return a watcher (EventEmitter) so Gulp knows this task is async/long-running
}

// Default 'gulp' command with start local server and watch files for changes.
export default series(html, css, js, imageMin, watch_files);

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
function copyhtmlroot() {
  return src('src/**/*.html')
    .pipe(dest('docs/variations/sitebase-static/'))
    .pipe(dest('docs/variations/sitebase-scss/'));
}

// COPY SASS FROM ROOT SRC
function copysassroot() {
  return src('src/**/*.scss')
    .pipe(dest('docs/'))
    .pipe(dest('docs/variations/sitebase-scss/'));
}

// COPY JS FROM ROOT SRC
function copyjsroot() {
  return src('src/**/*.js')
    .pipe(dest('docs/'))
    .pipe(dest('docs/variations/sitebase-static/'))
    .pipe(dest('docs/variations/sitebase-scss/'))
    .pipe(dest('docs/examples/productsite/'))
    // .pipe(dest('docs/examples/sitename-singlepagesite/'))
    .pipe(dest('docs/examples/singlepageportfolio/'));
}

// COPY IMAGES FROM ROOT SRC
function copyimagesroot() {
  return src('src/**/*.+(png|jpg|jpeg|gif|svg|webp|avif)', { encoding: false, base: 'src' })
    .pipe(dest('docs/'))
    .pipe(dest('docs/variations/sitebase-static/'))
    .pipe(dest('docs/variations/sitebase-scss/'))
    .pipe(dest('docs/examples/productsite/'))
    .pipe(dest('docs/examples/sitename-singlepagesite/'))
    .pipe(dest('docs/examples/singlepageportfolio/'));
}

// SASS ROOT
const sassOptions = {
  outputStyle: "expanded"
};
function sassroot() {
  return src('src/scss/**/*.scss')
    .pipe(sass(sassOptions))
    .pipe(dest('docs/css/'))
    .pipe(dest('docs/variations/sitebase-static/css/'))
    .pipe(dest('docs/variations/sitebase-scss/css/'))
    .pipe(dest('docs/examples/productsite/css/'))
    .pipe(dest('docs/examples/sitename-singlepagesite/css/'))
    .pipe(dest('docs/examples/singlepageportfolio/css/'));
}
// SASS LESSON1
// function loremipsum(cb) {
//   gulp.src("src/lorem/**/*.scss")
//     .pipe(gulp.dest("docs/"))
//     .pipe(gulp.dest("docs/"));
//   cb();
// }

// SASS LESSON1
function sasslesson1() {
  return src('docs/lessons/base-boilerplate.scss')
    .pipe(sass(sassOptions))
    .pipe(rename('css/style.css'))
    .pipe(dest('docs/lessons/base-boilerplate/'));
}

// SASS LESSON2
function sasslesson2() {
  return src('docs/lessons/base-globals.scss')
    .pipe(sass(sassOptions))
    .pipe(rename('css/style.css'))
    .pipe(dest('docs/lessons/base-globals/'));
}

// SASS LESSON3
function sasslesson3() {
  return src('docs/lessons/base-content.scss')
    .pipe(sass(sassOptions))
    .pipe(rename('css/style.css'))
    .pipe(dest('docs/lessons/base-content/'));
}

// SASS LESSON4
function sasslesson4() {
  return src('docs/lessons/base-layout.scss')
    .pipe(sass(sassOptions))
    .pipe(rename('css/style.css'))
    .pipe(dest('docs/lessons/base-layout/'));
}

// SASS LESSON5
function sasslesson5() {
  return src('docs/lessons/base-site-structure.scss')
    .pipe(sass(sassOptions))
    .pipe(rename('css/style.css'))
    .pipe(dest('docs/lessons/base-site-structure/'));
}

// SASS LESSON6
function sasslesson6() {
  return src('docs/lessons/base-site-togglenav.scss')
    .pipe(sass(sassOptions))
    .pipe(rename('css/style.css'))
    .pipe(dest('docs/lessons/base-site-togglenav/'));
}

// SASS LESSON7
function sasslesson7() {
  return src('docs/lessons/base-singlepagesite.scss')
    .pipe(sass(sassOptions))
    .pipe(rename('css/style.css'))
    .pipe(dest('docs/lessons/base-singlepagesite/'));
}

// SASS LESSON8
function sasslesson8() {
  return src('docs/lessons/base-multipagesite.scss')
    .pipe(sass(sassOptions))
    .pipe(rename('css/style.css'))
    .pipe(dest('docs/lessons/base-multipagesite/'));
}


// ZIP LESSON1
function ziplesson1() {
  return src('docs/lessons/base-boilerplate/**/*')
    .pipe(zip('base-boilerplate.zip'))
    .pipe(dest('docs/lessons/'));
}

// ZIP LESSON2
function ziplesson2() {
  return src('docs/lessons/base-globals/**/*')
    .pipe(zip('base-globals.zip'))
    .pipe(dest('docs/lessons/'));
}

// ZIP LESSON3
function ziplesson3() {
  return src('docs/lessons/base-content/**/*')
    .pipe(zip('base-content.zip'))
    .pipe(dest('docs/lessons/'));
}

// ZIP LESSON4
function ziplesson4() {
  return src('docs/lessons/base-layout/**/*')
    .pipe(zip('base-layout.zip'))
    .pipe(dest('docs/lessons/'));
}

// ZIP LESSON5
function ziplesson5() {
  return src('docs/lessons/base-site-structure/**/*')
    .pipe(zip('base-site-structure.zip'))
    .pipe(dest('docs/lessons/'));
}

// ZIP LESSON6
function ziplesson6() {
  return src('docs/lessons/base-site-togglenav/**/*')
    .pipe(zip('base-site-togglenav.zip'))
    .pipe(dest('docs/lessons/'));
}

// ZIP LESSON7
function ziplesson7() {
  return src('docs/lessons/base-singlepagesite/**/*')
    .pipe(zip('base-singlepagesite.zip'))
    .pipe(dest('docs/lessons/'));
}

// ZIP LESSON8
function ziplesson8() {
  return src('docs/lessons/base-multipagesite/**/*')
    .pipe(zip('base-multipagesite.zip'))
    .pipe(dest('docs/lessons/'));
}

// ZIP VERSION1
function zipvariation1() {
  return src('docs/variations/sitebase-static/**/*')
    .pipe(zip('sitebase-static.zip'))
    .pipe(dest('docs/variations/'));
}

// ZIP VARIATION2
function zipvariation2() {
  return src('docs/variations/sitebase-scss/**/*')
    .pipe(zip('sitebase-scss.zip'))
    .pipe(dest('docs/variations/'));
}

// ZIP EXAMPLE1
function zipexample1() {
  return src('docs/examples/productsite/**/*')
    .pipe(zip('productsite.zip'))
    .pipe(dest('docs/examples/'));
}

// ZIP EXAMPLE2
function zipexample2() {
  return src('docs/examples/singlepageportfolio/**/*')
    .pipe(zip('singlepageportfolio.zip'))
    .pipe(dest('docs/examples/'));
}

// ZIP EXAMPLE3
function zipexample3() {
  return src('docs/examples/sitename-singlepagesite/**/*')
    .pipe(zip('sitename-singlepagesite.zip'))
    .pipe(dest('docs/examples/'));
}

// WATCH DOCS
const doc_series = [html, css, js, imageMin, copyhtmlroot, copysassroot, copyjsroot, copyimagesroot, sassroot, sasslesson1, sasslesson2, sasslesson3, sasslesson4, sasslesson5, sasslesson6, sasslesson7, sasslesson8, ziplesson1, ziplesson2, ziplesson3, ziplesson4, ziplesson5, ziplesson6, ziplesson7, ziplesson8, zipvariation1, zipvariation2, zipexample1, zipexample2, zipexample3];

function watch_docs() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  const w2 = watch('src/*.html', series(...doc_series)).on('change', browserSync.reload);
  watch('src/scss/**/*.scss', series(...doc_series)).on('change', browserSync.reload);
  watch('src/js/*.js', series(...doc_series)).on('change', browserSync.reload);
  watch('src/**/*.+(png|jpg|jpeg|gif|svg)', series(...doc_series)).on('change', browserSync.reload);
  watch('docs/*.html', series(...doc_series)).on('change', browserSync.reload);

  return w2; // return a watcher so Gulp sees the task as active
}

// 'gulp docs' will build all docs assets and run on a local server.
export const docs = series(...doc_series, watch_docs);

// 'gulp build' will build all assets but not run on a local server.
export const build = parallel(...doc_series);

// Export individual tasks so they can be invoked directly (e.g. `npx gulp html`).
export {
  html,
  css,
  js,
  imageMin,
  imageMinWatch,
  watch_files,
  watch_docs,
  copyhtmlroot,
  copysassroot,
  copyjsroot,
  copyimagesroot,
  sassroot,
  sasslesson1,
  sasslesson2,
  sasslesson3,
  sasslesson4,
  sasslesson5,
  sasslesson6,
  sasslesson7,
  sasslesson8,
  ziplesson1,
  ziplesson2,
  ziplesson3,
  ziplesson4,
  ziplesson5,
  ziplesson6,
  ziplesson7,
  ziplesson8,
  zipvariation1,
  zipvariation2,
  zipexample1,
  zipexample2,
  zipexample3
};

//
// END BUILD DOCS
//

