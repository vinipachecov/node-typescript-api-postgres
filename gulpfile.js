/** TASKS FILE */

const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');



gulp.task("compile", function () {
  return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest("dist"));
});

gulp.task("clean", function() {
return gulp.src('dist')
           .pipe(clean());
});

gulp.task("copy-opts", ['clean', 'compile'], function() {
return gulp.src('tests/unit/config/mocha.opts')
           .pipe(gulp.dest('dist/tests/unit/config'))
           .pipe(gulp.dest('dist/tests/integration/config'))
});

gulp.task('copy-migration-config',['clean','compile', 'copy-opts' ], () => {
  return gulp.src('server/config/config.json')
    pipe(gulp.dest('dist/server/config'))
})

gulp.task('build', ['copy-migration-config'], () => {
  return gulp.src('server/migrations/')
    .pipe(gulp.dest('dist/server/migrations'))
});

// call the other tasks in a specific order
// gulp.task('build', ['copy-opts',]);

//  gulp.task('watch', ['build'], () => {
//    return gulp.watch(['server/**/*.ts', 'server/**/*.json', 'tests/**/*.ts','tests/**/*.opts'], ['build']);
// });


gulp.task('default', ['build']);