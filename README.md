## 🥤Gulp Boilerplate (4)

A basic Gulp 4 boilerplate to get developing locally with a few helpful tools already set up.

Tasks included:

- HTML minify (on build)
- CSS autoprefixer
- Sass minify
- JS minify
- Image minify
- Nunjucks
- Live reload
- Babel

## How to run
Install Gulp globally (if you don't already have it). Full installation docs (https://gulpjs.com/docs/en/getting-started/quick-start).

    npm install gulp-cli -g
Install necessary packages

    npm install
Run Gulp.

    gulp

The live reload task should then initiate the project on http://localhost:3000. If that port is already taken it will default to another number such as localhost:3001.

## Building assets

To build assets without starting a local server with live reload, use the build command:

    gulp build
