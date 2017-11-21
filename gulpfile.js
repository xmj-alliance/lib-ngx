const fs = require('fs');

const gulp = require('gulp');
const { exec } = require('child_process');
const del = require('del');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');

const { readfileAsync, getDirectories, compHack } = require('./lib/helpers')

const regComponents = getDirectories('./src');

gulp.task('default', (cb) => {
  // gulp entry
  runSequence(
    'clean',
    'stage',
    'hack:css',
    'hack:html',
    'compile:ts',
    'pack',
    'finalize'
  );
});

gulp.task('clean', (cb) => {
  return del(["dist", "staging"], cb);
});

gulp.task('stage', (cb) => {
  pump(
    [
      gulp.src('src/**/*.ts'),
      gulp.dest('staging/')
    ],
    cb
  )
});

gulp.task('hack:css', async () => {

  pump(
    [
      gulp.src('src/**/*.scss'),
      sass().on('error', sass.logError),
      cleanCSS(),
      gulp.dest('./staging/')
    ],
    async () => {
      // hack loop...
      for (let comp of regComponents) {
        try {
          let css = await readfileAsync(`./staging/${comp}/${comp}.component.css`);
          let comToHack = `./staging/${comp}/${comp}.component.ts`
          await compHack(comToHack, '\\[THIS_IS_MY_STYLE!\\]', css);
        } catch(e) {
          // comp may have no scss, in this case, it will get skipped
          console.log(`${comp} has been skipeed since it has no scss or scss file cannot read`);
        }

      }
    }
  );

});

gulp.task('hack:html', async (cb) => {
  // hack loop...
  for (let comp of regComponents) {
    try {
      let html = await readfileAsync(`./src/${comp}/${comp}.component.html`);
      let comToHack = `./staging/${comp}/${comp}.component.ts`
      await compHack(comToHack, '\\[THIS_IS_MY_HTML!\\]', html);
    } catch (error) {
      // comp ts missing or failed to read
      console.log(`${comp} has been skipeed since it has no component or its file cannot read`);
    }
  }

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

});

gulp.task('log', (cb) => {
  exec("echo 'Gulp works!'", (err, stdout, stderr)=>{
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});