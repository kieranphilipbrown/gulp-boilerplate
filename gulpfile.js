const gulp = require("gulp");
const { parallel, series } = require("gulp");

const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const watch = require("gulp-watch");
const browserSync = require("browser-sync").create(); //https://browsersync.io/docs/gulp#page-top
const reload = browserSync.reload;

// /*
// TOP LEVEL FUNCTIONS
//     gulp.task = Define tasks
//     gulp.src = Point to files to use
//     gulp.dest = Points to the folder to output
//     gulp.watch = Watch files and folders for changes
// */

// Optimise Images
function imageMin(callback) {
    gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
    callback();
}

// Copy all HTML files to Dist
function copyHTML(callback) {
    gulp.src("src/*.html").pipe(gulp.dest("dist"));
    callback();
}

// Scripts
function js(callback) {
    gulp.src("src/js/*js")
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
    callback();
}

// Compile Sass
function css(callback) {
    gulp.src("src/sass/*.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(gulp.dest("dist/css"));
    callback();
}

function watch_files() {
    gulp.watch(cssWatch, css);
    gulp.watch(jsWatch, gulp.series(js, reload));
}

// Browser Sync
function browser_sync(callback) {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    callback();
}

exports.default = parallel(copyHTML, css, js, imageMin, browser_sync);
