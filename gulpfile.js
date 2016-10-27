var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
    gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('public/js/lib'))
});