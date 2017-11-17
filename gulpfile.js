const gulp = require('gulp');
const { exec } = require('child_process');
const del = require('del');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');

gulp.task('default', (cb) => {
  // gulp entry
  runSequence('clean', 'ngc', 'pack');
});

gulp.task('clean', (cb) => {
  return del(["dist"], cb);
});

gulp.task('ngc', (cb) => {
  exec("npm run transpile", (err, stdout, stderr)=>{
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
})

gulp.task('pack', (cb) => {
  gulp.src('dist/index.js')
  .pipe(sourcemaps.init())
  .pipe(rollup({
    // also rollups `sourcemap` option is replaced by gulp-sourcemaps plugin
    format: 'umd',
    moduleName: 'lib.ngx',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
      'rxjs/Observable': 'Rx',
      'rxjs/Subject': "Rx",
      'rxjs/add/operator/distinctUntilChanged': "Rx.Observable.prototype"
    }
  }))
  // inlining the sourcemap into the exported .js file
  .pipe(sourcemaps.write())
  .pipe(rename('lib-ngx.umd.js'))
  .pipe(gulp.dest('dist/bundles'))
})

gulp.task('log', (cb) => {
  // place code for your default task here
  exec("echo 'Gulp works!'", (err, stdout, stderr)=>{
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});