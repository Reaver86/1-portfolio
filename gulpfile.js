const gulp = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const htmlmin = require("gulp-htmlmin");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const responsive = require("gulp-responsive");
const plumber = require("gulp-plumber");
const svgmin = require('gulp-svgmin');

gulp.task("scripts", function() {
  return gulp.src("./dev/js/**/*.js")
    .pipe(plumber())
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ["es2015"]
			}))
    	.pipe(uglify())
    	.pipe(concat("app.min.js"))
		.pipe(sourcemaps.write("."))
    .pipe(plumber.stop())
    .pipe(gulp.dest("./prod/js/"))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("styles", function() {
  return gulp.src("./dev/scss/**/*.scss")
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
    .pipe(minifyCSS())
		.pipe(concat("app.min.css"))
    .pipe(gulp.dest("./prod/css/"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("html", function() {
  return gulp.src("./dev/index.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("./prod/"))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("images", function() {
  return gulp.src("./dev/images/*.{png,jpg}")
    .pipe(responsive({
      "bg-*.jpg": [
        {
          width: 2000,
          quality: 50,
          rename: {
            suffix: "2x",
            extname: ".jpg"
          }
        },
        {
          width: 1000,
          quality: 50,
          rename: {
            suffix: "1x",
            extname: ".jpg"
          }
        }
      ],
      "coffee-*.jpg": [
        {
          width: 720,
          quality: 50,
          rename: {
            suffix: "-large",
            extname: ".jpg"
          }
        },
        {
          width: 360,
          quality: 50,
          rename: {
            suffix: "-small",
            extname: ".jpg"
          }
        }
      ],
      "alex.jpg": {
        quality: 50
      }
    }))
    .pipe(gulp.dest("./prod/images/"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("svg", function() {
  return gulp.src("./dev/images/*.svg")
      .pipe(svgmin())
      .pipe(gulp.dest("./prod/images/"));
});

gulp.task("fonts", function() {
  return gulp.src("./dev/fonts/**/*")
  .pipe(gulp.dest("./prod/fonts"))
});

gulp.task("browserSync", function() {
  browserSync({
    port: 3030,
    server: {
      baseDir: "./prod"
    },
		notify: false
  });
});

gulp.task("watch", ["browserSync", "scripts", "styles", "html", "images", "svg"], function() {
  gulp.watch("dev/js/**/*.js", ["scripts"]);
  gulp.watch("dev/scss/**/*.scss", ["styles"]);
  gulp.watch("dev/index.html", ["html"]);
	gulp.watch("dev/images/**/*", ["images", "svg"]);
});

gulp.task("default", ["watch"]);
