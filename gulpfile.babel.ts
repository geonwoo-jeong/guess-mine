import gulp from "gulp";
import pug from "gulp-pug";
import sass from "gulp-sass";
import typescript from "gulp-typescript";

const paths = {
  scripts: {
    dest: "dist/js",
    outFile: "index.js",
    src: "src/statics/*.ts"
  },
  styles: {
    dest: "dist/styles",
    src: "src/statics/styles.scss"
  },
  htmls: {
    dest: "dist/",
    src: "src/**/*.pug"
  }
};

export function htmls() {
  return gulp
    .src(paths.htmls.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.htmls.dest));
}

export function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(
      typescript({
        outFile: paths.scripts.outFile
      })
    )
    .pipe(gulp.dest(paths.scripts.dest));
}

export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest));
}
