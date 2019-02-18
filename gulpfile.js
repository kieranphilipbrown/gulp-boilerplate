const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create(); //https://browsersync.io/docs/gulp#page-top
const reload = browserSync.reload;

/*
TOP LEVEL FUNCTIONS
    gulp.task = Define tasks
    gulp.src = Point to files to use
    gulp.dest = Points to the folder to output
    gulp.watch = Watch files and folders for changes
*/

// Useful Logs message
// Type 'gulp message' in the terminal and it should output the task message
gulp.task('message', function() {
    return console.log("Gulp is running...");
});

// Optimise Images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

// Copy all HTML files to Dist
// To run this task use 'gulp copyHtml'
gulp.task('copyHtml', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Minify JS
gulp.task('minify', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Scripts
gulp.task('scripts', function() {
    gulp.src('src/js/*js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Compile Sass
gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Watch files for chanegs
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['sass'])
});

// Livereload
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });

    gulp.watch('src/sass/**/*.scss', ['sass']).on('change', reload);
    gulp.watch('src/js/*.js', ['scripts']).on('change', reload);
    gulp.watch('src/*.html', ['copyHtml']).on('change', reload);
});

// Do all the tasks and run with the default command - 'gulp'
gulp.task('default', ['imageMin', 'copyHtml', 'sass', 'scripts', 'serve'])

// This is just another example of how to run each of the tasks with the default gulp command
//gulp.task('default', ['message', 'imageMin', 'sass', 'copyHtml', 'scripts', 'watch'])
