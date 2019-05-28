import { watchFile } from "fs";
import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
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
    src: "src/statics/styles.scss",
    watch: "src/statics/**/*.scss"
  },
  htmls: {
    dest: "dist/",
    src: "src/**/*.pug"
  }
};

function htmls() {
  return gulp
    .src(paths.htmls.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.htmls.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(
      typescript({
        outFile: paths.scripts.outFile
      })
    )
    .pipe(gulp.dest(paths.scripts.dest));
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

function watchFiles() {
  gulp.watch(paths.styles.src, styles);
}

const dev = gulp.series([styles, watchFiles]);

export default dev;
