const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
  
});
// min css
gulp.task('style', function(){
    return gulp.src("src/sass/*.+(scss|sass)")
        .pipe(sass().on('error', sass.logError))
        
        .pipe(gulp.dest("src/css"))
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        
        .pipe(autoprefixer())
        .pipe(rename({
        suffix: ".min",
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())

});



gulp.task('watch', function(){
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("style"))
      
    gulp.watch("src/*html").on("change",()=> browserSync.reload());
})
gulp.task('default', gulp.parallel('watch','server','style'))