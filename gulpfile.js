/* PLUGINS */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const inject = require('gulp-inject');
const angularFilesort = require('gulp-angular-filesort');
const copy = require('gulp-copy');
const del = require('del');
const es = require('event-stream');
const concat = require('gulp-concat');
const fs = require('fs');
const scp = require('gulp-scp2');

/* PATHS */
const distDir = './dist';
const distStylesDir = distDir + '/styles';
const distScriptsDir = distDir + '/scripts';
const distImagesDir = distDir + '/images';
const srcDir = './client';

gulp.task('concatVendorJs', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/firebase/firebase-app.js',
    'node_modules/firebase/firebase-auth.js',
    'node_modules/firebaseui/dist/firebaseui.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    'node_modules/angular-aria/angular-aria.min.js',
    'node_modules/angular-messages/angular-messages.min.js',
    'node_modules/angular-material/angular-material.min.js',
    'node_modules/angularfire/dist/angularfire.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'node_modules/moment/moment.js',
    'node_modules/bootstrap-daterangepicker/daterangepicker.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(distScriptsDir))
});

gulp.task('concatVendorCss', () => {
  return gulp.src([
    'node_modules/firebaseui/dist/firebaseui.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap-daterangepicker/daterangepicker.css'
  ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(distStylesDir))
});

gulp.task('copy', () => {
  return es.merge(
    /* index.html */
    gulp.src(`${srcDir}/index.html`)
      .pipe(gulp.dest(distDir)),

    /* JS */
    gulp.src(`${srcDir}/mealpler/**/*.{js,html,htm}`)
      .pipe(gulp.dest(distScriptsDir)),

    /* Images */
    gulp.src(`${srcDir}/assets/images/**/*.{png,ico,jpg}`)
      .pipe(gulp.dest(distImagesDir))
  )
});

gulp.task('clean', () => {
  return del(distDir);
});

gulp.task('sass', () => {
  return gulp.src(`${srcDir}/assets/css/*.scss`)
    .pipe(sass())
    .pipe(gulp.dest(distStylesDir))
});

gulp.task('index', () => {
  return gulp.src(`${distDir}/index.html`)
    .pipe(inject(
      gulp.src([ `${distScriptsDir}/**/*.js`, `!${distScriptsDir}/vendor.js` ]).pipe(angularFilesort()).pipe(angularFilesort()), { relative: true }
    ))
    .pipe(inject(
      gulp.src(`${distScriptsDir}/vendor.js`), { relative: true, starttag: '<!-- inject:vendor:{{ext}} -->' }
    ))
    .pipe(inject(
      gulp.src(`${distStylesDir}/vendor.css`), { relative: true, starttag: '<!-- inject:vendor:{{ext}} -->' }
    ))
    .pipe(inject(
      gulp.src([`${distStylesDir}/**/*.css`, `!${distStylesDir}/vendor.css`]), { relative: true }
    ))
    .pipe(gulp.dest(distDir))
});

gulp.task('serve', () => {
  return browserSync.init({
    server: './dist',
    files: './dist/**/*',
    reloadDebounce: 500
  })
});

gulp.task('watch', () => {
  gulp.watch(`${srcDir}/mealpler/**/*.{js,html,htm}`, () => runSequence('copy', 'index'))
  gulp.watch(`${srcDir}/index.html`, () => runSequence('copy', 'index'))
  gulp.watch(`${srcDir}/assets/css/*.scss`, [ 'sass' ])
});

gulp.task('build', () => runSequence('clean', 'copy', 'concatVendorJs', 'concatVendorCss', 'sass', 'index'))

gulp.task('deploy', () => {
  const key = fs.readFileSync('key.pem', 'utf8')

  return gulp.src('dist/**/*')
    .pipe(scp({
      host: '35.156.52.114',
      username: 'ubuntu',
      privateKey: key,
      dest: '/home/ubuntu/public'
    }))
    .on('error', (err) => console.log(err))
});

gulp.task('default', () => runSequence('clean', 'copy', 'concatVendorJs', 'concatVendorCss', 'sass', 'index', 'serve', 'watch'))