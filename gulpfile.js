var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');
var jsFiles = ['*.js'];

gulp.task('serve', function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles,
        ignore: ['./node_modules/**']
    };

    return nodemon(options).on('restart', function(ev) {
        console.log('Restarting...');
    });
});

gulp.task('test', function() {
    env({
        vars: {
            ENV: 'Test'
        }
    });
    gulp.src('tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}));
});
