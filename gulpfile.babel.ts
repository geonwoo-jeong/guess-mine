import del from "del";
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

const clean = () => del("src/static");

const htmls = () =>
  gulp
    .src(paths.htmls.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.htmls.dest));

const scripts = () =>
  gulp
    .src(paths.scripts.src)
    .pipe(
      typescript({
        outFile: paths.scripts.outFile
      })
    )
    .pipe(gulp.dest(paths.scripts.dest));

const styles = () =>
  gulp
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

const watchFiles = () => gulp.watch(paths.styles.src, styles);

const dev = gulp.series(clean, styles, watchFiles);

export default dev;
