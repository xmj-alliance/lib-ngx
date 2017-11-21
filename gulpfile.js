const fs = require('fs');

const gulp = require('gulp');
const { exec } = require('child_process');
const del = require('del');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');
// const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('default', (cb) => {
  // gulp entry
  runSequence(
    'clean',
    // 'compile:css',
    'compile:ts',
    'pack',
    'finalize'
  );
});

gulp.task('clean', (cb) => {
  return del(["dist"], cb);
});

gulp.task('compile:css', (cb) => {
  pump(
    [
      gulp.src('src/**/*.scss'),
      sass().on('error', sass.logError),
      cleanCSS(),
      gulp.dest((file) => {
        return file.base; // because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
      })
    ],

    cb
  );

});

gulp.task('compile:ts', (cb) => {
  exec("npm run transpile", (err, stdout, stderr)=>{
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});

gulp.task('pack', (cb) => {
  pump(
    [
      gulp.src('dist/index.js'),
      sourcemaps.init(),
      rollup({
        // also rollups `sourcemap` option is replaced by gulp-sourcemaps plugin
        format: 'umd',
        moduleName: 'lib.ngx',
        treeshake: true,
        globals: {
          '@angular/core': 'ng.core',
          '@angular/common': 'ng.common',
          'rxjs/Observable': 'Rx',
          'rxjs/Subject': "Rx",
          'rxjs/add/operator/distinctUntilChanged': "Rx.Observable.prototype"
        }
      }),
      // inlining the sourcemap into the exported .js file
      sourcemaps.write(),
      rename('lib-ngx.umd.js'),
      gulp.dest('dist/bundles/'),
      uglify({
        "compress": true,
        "mangle": true
      }),
      rename('lib-ngx.umd.min.js'),
      gulp.dest('dist/bundles/')
    ],
    cb
  );

});

gulp.task('finalize', (cb) => {
  // read package.json
  let package = require('./package.json');
  // edit package.json
  package.peerDependencies = package.dependencies;
  delete package.dependencies;
  delete package.devDependencies;
  delete package.scripts;

  package.main = "bundles/lib-ngx.umd.js";
  package.module = "index.js";
  package.typings = "index.d.ts";
  // write to dist
  fs.writeFileSync('./dist/package.json', JSON.stringify(package, null, 2), {encoding: 'UTF-8'});
  // copy readme and license to dist
  pump(
    [
      gulp.src('./readme.md'),
      gulp.dest('./dist/')
    ]
  );
  pump(
    [
      gulp.src('./LICENSE'),
      gulp.dest('./dist/')
    ]
  );
  // remove that node_modules folder in dist folder
  // return del(["dist/node_modules"], cb);
});

gulp.task('log', (cb) => {
  exec("echo 'Gulp works!'", (err, stdout, stderr)=>{
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});