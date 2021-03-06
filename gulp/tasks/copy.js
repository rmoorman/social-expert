import gulp from 'gulp';
import path from 'path';
import rename from 'gulp-rename';
import less from 'gulp-less';

const copy = (dest) => () => {
  gulp.src('./src/assets/**/*').pipe(gulp.dest(dest));
  gulp.src(
    ['./src/electron/**', '!./src/electron/resources', '!./src/electron/resources/**'])
    .pipe(gulp.dest(dest));
};

const copyModules = (srcs) => {
  srcs.forEach(name => {
    gulp.src(`./node_modules/${name}/**`)
      .pipe(gulp.dest(`./build/electron/node_modules/${name}`));
  });
};

gulp.task('copy:dev', copy('./dev'));
gulp.task('copy:build:electron', () => {
  copy('./build/electron')();
  copyModules(['electron-gh-releases', 'electron-positioner', 'electron-debug', 'auto-launch']);
});
