let gulp = require("gulp");
let dependencies = require("gulp-html-dependencies");
let less = require("gulp-less");
let inject = require("gulp-inject");
let cleanCSS = require('gulp-clean-css');
let dest = require('gulp-dest');
let livereload = require('gulp-livereload');
let path_dest = 'dist/';

gulp.task('minify-css', function() {
    return gulp.src('assets/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('dependencies', function() {
    return gulp.src('index.html')
        .pipe(dependencies({
            dest: path_dest,    // The basedir of your application. default: path.dirname(file.path)
            prefix: 'lib',  // The URL prefix. Default "/"
        }))
        .pipe(gulp.dest(path_dest));
});

gulp.task('css', function(){
    return gulp.src('assets/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('assets/css/'))
        .pipe(livereload());
});

gulp.task('index', function () {
    let target = gulp.src('./index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    let sources = gulp.src(['./src/**/*.js', './src/*.js'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('assets/css/*.less', ['css']);
});


gulp.task('default', ['css', 'minify-css', 'dependencies', 'index', 'watch']);